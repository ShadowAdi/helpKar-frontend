import { Image,  View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

const AuthChoiceScreen = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#000000",
        height: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", objectFit: "contain" }}
          source={require("../../assets/images/Logo.webp")}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          gap: 14,
          paddingTop: 16,
          paddingBottom: 8,
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
        <PrimaryButton
          buttonText="Ngo Login"
          onPress={() => router.push("/NgoLogin")}
        />
        <SecondaryButton
          buttonText="User Login"
          onPress={() => router.push("/UserLogin")}
        />
      </View>
    </View>
  );
};

export default AuthChoiceScreen;
