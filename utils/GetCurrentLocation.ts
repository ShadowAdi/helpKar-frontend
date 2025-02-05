import * as Location from "expo-location";

export interface LocationObjectCoords {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface LocationObject {
  coords: LocationObjectCoords;
  timestamp: number;
}

export async function getCurrentLocation({
  setLocation,
}: {
  setLocation: (location: LocationObject | null) => void;
}) {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  try {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    return location;
  } catch (error) {
    console.error("Error getting location:", error);
    setLocation(null);
    throw error;
  }
}
