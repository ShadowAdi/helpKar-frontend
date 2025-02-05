import {  Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/Styles/GlobalColors";

const PrimaryButton = ({
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
        backgroundColor: "transparent",
        marginHorizontal: "auto",
        borderRadius: 8,
        flex: 1,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

