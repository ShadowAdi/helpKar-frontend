import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/UserContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetItemFromLocalStorage } from "@/utils/StorageToken";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/Styles/GlobalColors";

const ResolvedIssuePage = () => {
  const { issueId } = useLocalSearchParams();
  const { push, back } = useRouter();
  const userAuth = useContext(AuthContext);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [base64Files, setBase64Files] = useState<string[]>([]);
  const [resolutionDetails, setResolutionDetails] = useState("");

  if (userAuth?.role !== "ngo") {
    push(`../(issues)/${issueId}`);
  }

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

    try {
      const mediaUrls = await Promise.all(
        base64Files.map((file) => uploadToCloudinary(file))
      );

      const payload = {
        solvedResolutionMedia: mediaUrls,
        resolutionDetails,
      };

      const response = await fetch(
        "http://192.168.29.209:3000/api/issues/issue",
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
      console.log("Result ", result);

      if (response.ok) {
        push("/Discover");
      } else {
        console.error("Creation Error:", result);
        alert("Failed to create issue. Please try again.");
      }
    } catch (error) {
      console.error("Creation Error:", error);
      alert("Failed to create issue. Please try again.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#f0f0f0",
        gap: 24,
        paddingVertical: 20,
        paddingHorizontal: 14,
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create Issue</Text>
        <Text style={styles.subHeader}>
          Create the issue you found out in your area
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 4,
              borderBottomWidth: 1,
              borderColor: "#343434",
            }}
          >
            <TextInput
              placeholder={"Tell How You Solve It"}
              placeholderTextColor={"#f0f0f090"}
              multiline={true}
              numberOfLines={5}
              style={{
                flex: 1,
                color: Colors.whiteColor,
                paddingHorizontal: 0,
                fontSize: 12,
                paddingVertical: 4,
              }}
              value={resolutionDetails}
              onChangeText={setResolutionDetails}
            />
          </View>
        </View>
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
      </View>
    </View>
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
});

export default ResolvedIssuePage;
