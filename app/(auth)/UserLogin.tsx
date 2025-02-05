import { StatusBar, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/Styles/GlobalColors";

const UserLogin = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        height: "100%",
        gap: 8,
        paddingHorizontal: 16,
        flexDirection: "column",
        paddingVertical: 20,
      }}
    >
      <Text style={{ color: Colors.blackColor, fontSize: 14 }}>User Login</Text>
    </View>
  );
};

export default UserLogin;
