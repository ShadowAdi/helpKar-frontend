import { AuthProvider } from "@/context/UserContext";
import { CheckAuth } from "@/utils/CheckAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated = await CheckAuth();
      setIsLoggedIn(isAuthenticated);
      setIsLoading(false);
    }
    checkAuthentication();
  }, []);

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("isLoggedIn:", isLoggedIn);
    console.log("Segments:", segments);

    if (!isLoading) {
      const firstSegment = segments[0] as string | undefined;
      const secondSegment = segments[1] as string | undefined;

      const isOnAuthScreen = firstSegment === "(auth)";
      const isOnTabsScreen = firstSegment === "(tabs)";
      const isAtRoot = firstSegment === "_sitemap" || !firstSegment;

      if (!isLoggedIn && isOnTabsScreen) {
        console.log("Redirecting to AuthChoiceScreen...");
        router.replace("/(auth)/AuthChoiceScreen");
      }

      if (isLoggedIn && isOnAuthScreen) {
        console.log("Redirecting to Home...");
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
    return <Text>Loading...</Text>;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(issues)" options={{ headerShown: false }} />
        <Stack.Screen name="(users)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
