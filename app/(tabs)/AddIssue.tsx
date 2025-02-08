import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Styles/GlobalColors";
import { useRouter } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { getCurrentLocation, LocationObject } from "@/utils/GetCurrentLocation";
import MapView, { Marker, Region } from "react-native-maps";
import { GetItemFromLocalStorage } from "@/utils/StorageToken";

const AddIssue = () => {
  const [form, setForm] = useState({
    issueName: "dummy",
    issueDescription: "dummy",
    cityLocation: "lucknow",
    stateLocation: "UP",
    locationPincode: "226004",
    category: "Road",
    threatLevel: "Low",
  });
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [base64Files, setBase64Files] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState({
    latitude: "26.8321088",
    longitude: "80.9101754",
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const router = useRouter();

  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 26.8321088,
    longitude: 80.9101754,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isLocationLoading, setIsLocationLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      setIsLocationLoading(true);
      try {
        const loc = await getCurrentLocation({ setLocation });
        if (loc) {
          const newRegion = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

          setMapRegion(newRegion);
          setSelectedLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
          setCoordinates({
            latitude: loc.coords.latitude.toString(),
            longitude: loc.coords.longitude.toString(),
          });
        }
      } catch (err: any) {
        Alert.alert(
          "Location Error",
          "Unable to get your location. Please check your location permissions.",
          [{ text: "OK" }]
        );
        console.error("Error getting location:", err);
      } finally {
        setIsLocationLoading(false);
      }
    };

    requestLocationPermission();
  }, []);
  // Categories and threat levels from your mongoose schema
  const categories = ["Road", "Water", "Electricity", "Sanitation", "Others"];
  const threatLevels = ["Low", "Medium", "High", "Critical"];

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getCurrentLocation({ setLocation });
        setLocation(loc);
        if (loc) {
          setCoordinates({
            latitude: loc.coords.latitude.toString(),
            longitude: loc.coords.longitude.toString(),
          });
          setSelectedLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error in component:", err);
      }
    };

    fetchLocation();
  }, []);

  type FormFields = keyof typeof form;

  const handleChange = (key: FormFields, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    updateLocationState(coordinate);
  };

  const updateLocationState = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    setSelectedLocation(coordinate);
    setCoordinates({
      latitude: coordinate.latitude.toString(),
      longitude: coordinate.longitude.toString(),
    });
    setMapRegion({
      ...mapRegion,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const handleCoordinateChange = (
    key: "latitude" | "longitude",
    value: string
  ) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    const numValue = Number(sanitizedValue);

    // Basic coordinate validation
    if (key === "latitude" && (numValue < -90 || numValue > 90)) {
      Alert.alert("Invalid Latitude", "Latitude must be between -90 and 90");
      return;
    }
    if (key === "longitude" && (numValue < -180 || numValue > 180)) {
      Alert.alert(
        "Invalid Longitude",
        "Longitude must be between -180 and 180"
      );
      return;
    }

    setCoordinates((prev) => ({
      ...prev,
      [key]: sanitizedValue,
    }));

    const lat = key === "latitude" ? sanitizedValue : coordinates.latitude;
    const lng = key === "longitude" ? sanitizedValue : coordinates.longitude;

    if (!isNaN(Number(lat)) && !isNaN(Number(lng))) {
      const newLocation = {
        latitude: Number(lat),
        longitude: Number(lng),
      };
      setSelectedLocation(newLocation);
      setMapRegion({
        ...mapRegion,
        ...newLocation,
      });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"], // Allows both images and videos
      allowsEditing: false, // Set to false to allow multiple selections
      allowsMultipleSelection: true, // Enable multiple selections
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setMediaFiles((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
      setBase64Files((prev) => [
        ...prev,
        ...result.assets.map(
          (asset) => `data:image/jpg;base64,${asset.base64}`
        ),
      ]);
    }
  };

  const uploadToCloudinary = async (base64Img: string): Promise<string> => {
    const data = {
      file: base64Img,
      upload_preset: "HelpKar_Preset",
    };

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/shadowaditya/image/upload",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: { secure_url: string } = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleCreateIssue = async () => {
    const token = await GetItemFromLocalStorage("token");
    if (!token) {
      console.log("Token does not exist");
      return null;
    }
    if (!selectedLocation) {
      alert("Please select a location on the map or enter coordinates");
      return;
    }
    try {
      const mediaUrls = await Promise.all(
        base64Files.map((file) => uploadToCloudinary(file))
      );

      const payload = {
        ...form,
        issueMedia: mediaUrls,
        location: {
          type: "Point",
          coordinates: [80.9234, 26.8467],
        },
      };

      const response = await fetch(
        "https://help-kar-server.vercel.app/api/issues/issue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        router.push("/Discover");
      } else {
        console.error("Creation Error:", result);
        alert("Failed to create issue. Please try again.");
      }
    } catch (error) {
      console.error("Creation Error:", error);
      alert("Failed to create issue. Please try again.");
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getCurrentLocation({ setLocation });
        setLocation(loc);
      } catch (err: any) {
        setError(err.message);
        console.error("Error in component:", err);
      }
    };

    fetchLocation();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create Issue</Text>
        <Text style={styles.subHeader}>
          Create the issue you found out in your area
        </Text>
      </View>

      <View style={styles.formContainer}>
        <CustomTextInput
          placeHolderText="Issue Name"
          setText={(text) => handleChange("issueName", text)}
          text={form.issueName}
        />

        <CustomTextInput
          placeHolderText="Description"
          setText={(text) => handleChange("issueDescription", text)}
          text={form.issueDescription}
          multiline={true}
          numberOfLines={5}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.category}
            style={styles.picker}
            onValueChange={(value) => handleChange("category", value)}
            dropdownIconColor={Colors.whiteColor}
          >
            {categories.map((category) => (
              <Picker.Item
                key={category}
                label={category}
                value={category}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.threatLevel}
            style={styles.picker}
            onValueChange={(value) => handleChange("threatLevel", value)}
            dropdownIconColor={Colors.whiteColor}
          >
            {threatLevels.map((level) => (
              <Picker.Item
                key={level}
                label={level}
                value={level}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>

        <CustomTextInput
          placeHolderText="City"
          setText={(text) => handleChange("cityLocation", text)}
          text={form.cityLocation}
        />

        <CustomTextInput
          placeHolderText="Pincode"
          setText={(text) => handleChange("locationPincode", text)}
          text={form.locationPincode}
          keyboardType="numeric"
        />

        <CustomTextInput
          placeHolderText="State"
          setText={(text) => handleChange("stateLocation", text)}
          text={form.stateLocation}
        />

        <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
          <Text style={styles.mediaButtonText}>Add Media</Text>
        </TouchableOpacity>

        {mediaFiles.length > 0 && (
          <View style={styles.mediaPreviewContainer}>
            {mediaFiles.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.mediaPreview} />
            ))}
          </View>
        )}

        <View
          style={{
            flexDirection: "column",
            gap: 12,
            marginBottom: 16,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              width: "100%",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View style={styles.coordinateInput}>
              <CustomTextInput
                placeHolderText="Latitude"
                setText={(text) => handleCoordinateChange("latitude", text)}
                text={coordinates.latitude}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.coordinateInput}>
              <CustomTextInput
                placeHolderText="Longitude"
                setText={(text) => handleCoordinateChange("longitude", text)}
                text={coordinates.longitude}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.mapContainer}>
            {isLocationLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading your location...</Text>
              </View>
            ) : (
              <MapView
                style={styles.map}
                region={mapRegion}
                onPress={handleMapPress}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {selectedLocation && (
                  <Marker
                    coordinate={selectedLocation}
                    title="Selected Location"
                    description="Issue location"
                    draggable={true}
                   
                    onDragEnd={(e) => {
                      updateLocationState(e.nativeEvent.coordinate);
                    }}
                  />
                )}
              </MapView>
            )}
            <Text style={styles.mapHelper}>
              Tap on the map to select location or drag the marker to adjust
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleCreateIssue} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Create Issue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 28,
    minHeight: "100%",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: "column",
    gap: 0,
  },
  header: {
    fontSize: 24,
    color: Colors.whiteColor,
    fontWeight: "600",
    paddingHorizontal: 14,
  },
  subHeader: {
    fontSize: 12,
    color: Colors.whiteColor,
    opacity: 0.7,
    paddingHorizontal: 14,
  },
  formContainer: {
    flexDirection: "column",
    gap: 26,
    paddingTop: 30,
    width: "100%",
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: "#343434",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    color: Colors.whiteColor,
    backgroundColor: Colors.blackColor,
  },
  pickerItem: {
    color: Colors.whiteColor,
    backgroundColor: "#000",
  },
  mediaButton: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  mediaButtonText: {
    color: Colors.whiteColor,
    fontSize: 14,
    fontWeight: "500",
  },
  mediaPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  submitButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: Colors.primaryColor,
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 16,
    color: Colors.whiteColor,
    fontWeight: "500",
  },

  coordinateInput: {
    flex: 1,
  },
  loadingContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  loadingText: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
  mapContainer: {
    height: 300,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  mapHelper: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 8,
    borderRadius: 4,
    color: Colors.whiteColor,
    fontSize: 12,
    textAlign: "center",
  },
});

export default AddIssue;
