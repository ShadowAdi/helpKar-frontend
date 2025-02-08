import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/Styles/GlobalColors";
import CustomTextInput from "@/components/CustomTextInput";
import { Link, useRouter } from "expo-router";
import { SaveToken } from "@/utils/StorageToken";

const NgoLogin = () => {
  const [email, setEmail] = useState("contact@helpinghands.org");
  const [password, setPassword] = useState("SecurePass123!");
  const router = useRouter();

  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://help-kar-server.vercel.app/api/ngos/login-ngo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      const { message, token,role } = result;

      if (response.ok) {
        SaveToken("token", token);
        SaveToken("role", role);


        alert(message);
        router.push("/(tabs)/Home");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Failed to Login. Please try again.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#000",
        height: "100%",
        gap: 8,
        paddingHorizontal: 22,
        flexDirection: "column",
        paddingVertical: 28,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 8,
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{ flexDirection: "column", gap: 2, alignItems: "flex-start" }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              color: Colors.whiteColor,
            }}
          >
            Ngo Login
          </Text>
          <Text
            style={{ fontSize: 14, color: Colors.whiteColor, opacity: 0.9 }}
          >
            Enter your details and Login as a NGO
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 26,
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 26,
              justifyContent: "flex-start",
              width: "100%",
              paddingTop: 30,
            }}
          >
            <CustomTextInput
              placeHolderText="Enter Email"
              setText={setEmail}
              text={email}
              key={"email"}
            />
            <CustomTextInput
              placeHolderText="Enter password"
              setText={setPassword}
              text={password}
              key={"password"}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 8,
              borderRadius: 100,
              backgroundColor: Colors.primaryColor,
              marginTop: 14,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 18,
        }}
      >
        <Text
          style={{ fontSize: 18, color: Colors.whiteColor, fontWeight: "500" }}
        >
          Don't Have an Ngo account
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/NgoRegister");
          }}
          style={{
            backgroundColor: Colors.snowColor,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            marginHorizontal: "auto",
            borderRadius: 100,
          }}
        >
          <Link
            href={"/NgoRegister"}
            style={{
              color: Colors.primaryColor,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Register
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NgoLogin;
