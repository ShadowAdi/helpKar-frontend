import {  Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/Styles/GlobalColors";

const SecondaryButton = ({
  buttonText,
  onPress,
}: {
  buttonText: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        marginHorizontal: "auto",
        borderRadius: 8,
        flex: 1,
        borderWidth: 2,
      }}
    >
      <Text
        style={{
          color: Colors.primaryColor,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

