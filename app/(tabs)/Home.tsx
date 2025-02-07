import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getCurrentLocation, LocationObject } from "@/utils/GetCurrentLocation";
import { useRouter } from "expo-router";
import { Colors } from "@/Styles/GlobalColors";

const HomeScreen = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<null | [] | any[]>(null);
  const router = useRouter();
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLocationLoading(true);
      try {
        const loc = await getCurrentLocation({ setLocation });
        setLocation(loc);

        fetchNearbyIssues(loc.coords.latitude, loc.coords.longitude);
      } catch (err: any) {
        setError(err.message);
        console.error("Error in component:", err);
      } finally {
        setIsLocationLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const fetchNearbyIssues = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `http://192.168.29.209:3000/api/issues/issues-location-based?latitude=${latitude}&longitude=${longitude}&radius=5000`
      );
      const data = await response.json();
      if (data.success) {
        console.log("Nearby issues data: ", data);
        setIssues(data.issues);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
      setIssues(null);
      Alert.alert("Error", "Could not fetch nearby issues.");
    }
  };

  return (
    <View style={styles.container}>
      {isLocationLoading ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: Colors.primaryColor }}>
            Loading your location...
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={
            location
              ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : {
                  latitude: 26.8321088,
                  longitude: 80.9101754,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
          }
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="My Location"
              description="You are here"
            />
          )}
          {issues &&
            issues.length > 0 &&
            issues.map((issue, index) => (
              <Marker
                onPress={() => {
                  router.push(`../(issues)/${issue._id}`);
                }}
                key={index}
                coordinate={{
                  latitude: issue.location.coordinates[1], // Fixed: accessing nested coordinates
                  longitude: issue.location.coordinates[0], // Fixed: accessing nested coordinates
                }}
                title={issue.issueName}
                description={issue.issueDescription}
                pinColor="green"
              />
            ))}
        </MapView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
