import { useEffect, useState, useContext } from "react";
import { Tabs, Redirect } from "expo-router";
import {  Feather } from "@expo/vector-icons";
import { AuthContext } from "@/context/UserContext";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading || !auth) {
    return null;
  }

  // If trying to access protected routes without auth, redirect to auth choice screen
  if (!auth?.user && !auth?.token) {
    return <Redirect href="/auth/AuthChoiceScreen" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          flexDirection: "row",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={size} color={color} />
          ),
        }}
      />

      {auth?.user && auth?.role === "user" && (
        <Tabs.Screen
          name="add"
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({ color, size }) => (

<AntDesign name="plus" size={24} color="black" />            ),
          }}
        />
      )}

      {auth?.user && (
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            href: auth?.user ? "/Profile" : "/auth/AuthChoiceScreen",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}