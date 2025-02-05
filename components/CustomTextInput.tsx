import { Colors } from "@/Styles/GlobalColors";
import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Image } from "react-native";

interface CustomTextInputProps {
  placeHolderText: string;
  text: string;
  setText: (text: string) => void;
  isValid?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeHolderText,
  text,
  setText,
  isValid = true,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 8,
          paddingHorizontal: 14,
          paddingVertical: 4,
          borderBottomWidth: 1,
          borderColor: "#343434",
        }}
      >
        <TextInput
          placeholder={placeHolderText}
          placeholderTextColor={"#f0f0f090"}
          style={{
            flex: 1,
            color: Colors.whiteColor,
            paddingHorizontal: 0,
            fontSize: 12,
            paddingVertical: 4,
          }}
          secureTextEntry={!isPasswordVisible}
          value={text}
          onChangeText={setText}
          keyboardType={keyboardType}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Image
              source={require("../assets/images/eye-closed.webp")}
              style={{ width: 12, height: 12 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
