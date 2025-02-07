import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/Styles/GlobalColors";
import CustomTextInput from "@/components/CustomTextInput";

const UserRegister = () => {
  const [form, setForm] = useState({
    username: "aditya",
    email: "adi@gmail.com",
    password: "adi123",
    cityLocation: "lucknow",
    stateLocation: "U.P",
    pincode: "226004",
    phoneNumber: "7887086807",
  });
  const router = useRouter();

  type FormFields = keyof typeof form; // Extracts valid keys from form state

  const handleChange = (key: FormFields, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      location: {
        city: form.cityLocation,
        state: form.stateLocation,
        pincode: form.pincode,
      },
      phoneNumber:form.phoneNumber
    };

    try {
      const response = await fetch(
        "http://192.168.29.209:3000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        router.push("/UserLogin");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Failed to register. Please try again.");
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 30, // Ensures enough space at the bottom for scrolling
      }}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 12,
        paddingVertical: 28,
        minHeight: "100%",
        paddingBottom: 36,
      }}
    >
      <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
        <Text
          style={{ fontSize: 24, fontWeight: "500", color: Colors.whiteColor }}
        >
          User Register
        </Text>
        <Text style={{ fontSize: 14, color: Colors.whiteColor, opacity: 0.9 }}>
          Enter all your details and register as an User
        </Text>
        <View style={{ flexDirection: "column", gap: 26, paddingTop: 30 }}>
          <CustomTextInput
            placeHolderText="Username"
            setText={(text) => handleChange("username", text)}
            text={form.username}
          />
          <CustomTextInput
            placeHolderText="email"
            setText={(text) => handleChange("email", text)}
            text={form.email}
          />
          <CustomTextInput
            placeHolderText="password"
            setText={(text) => handleChange("password", text)}
            text={form.password}
          />
          <CustomTextInput
            placeHolderText="7887086807"
            setText={(text) => handleChange("phoneNumber", text)}
            text={form.phoneNumber}
          />
          <CustomTextInput
            placeHolderText="lucknow"
            setText={(text) => handleChange("cityLocation", text)}
            text={form.cityLocation}
          />
          <CustomTextInput
            placeHolderText="U.P"
            setText={(text) => handleChange("stateLocation", text)}
            text={form.stateLocation}
          />
          <CustomTextInput
            placeHolderText="226004"
            setText={(text) => handleChange("pincode", text)}
            text={form.pincode}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 8,
            borderRadius: 100,
            backgroundColor: Colors.primaryColor,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: Colors.whiteColor,
              fontWeight: "500",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 12,
          marginTop: 40,
          paddingBottom: 24,
        }}
      >
        <Text
          style={{ fontSize: 18, color: Colors.whiteColor, fontWeight: "500" }}
        >
          Already Have an User Account?
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.snowColor,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            borderRadius: 100,
          }}
        >
          <Link
            href={"/UserLogin"}
            style={{
              color: Colors.primaryColor,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Login
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserRegister;
