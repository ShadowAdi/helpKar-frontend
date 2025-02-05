import { CheckAuth } from "@/utils/CheckAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated = await CheckAuth();
      setIsLoggedIn(isAuthenticated);
      setIsLoading(false); // Authentication check is complete
    }

    checkAuthentication();
  }, []);

  // Redirect logic

  useEffect(() => {
    if (!isLoading) {
      const firstSegment = segments[0] as string | undefined;

      const isOnAuthScreen = firstSegment === "(auth)";
      const isOnTabsScreen = firstSegment === "(tabs)";
      const isAtRoot = firstSegment === "_sitemap" || !firstSegment;

      if (isLoggedIn && isOnAuthScreen) {
        router.replace("/(tabs)/Home");
      } else if (
        !isLoggedIn &&
        !isOnAuthScreen &&
        !isAtRoot &&
        !isOnTabsScreen
      ) {
        router.replace("/(auth)/AuthChoiceScreen");
      }
    }
  }, [isLoggedIn, isLoading, segments]);

  if (isLoading) {
    return <Text>Loading...</Text>; // Display a loading indicator while checking authentication
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(issues)" options={{ headerShown: false }} />
    </Stack>
  );
}
