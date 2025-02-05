import { View, Text, Image, StatusBar } from "react-native";
import React from "react";

interface ItemProps {
  title: string;
  description: string;
  background_color: string;
  id: number;
  imageUrl: string;
}

// Define the imageMap with an index signature
const imageMap: { [key: string]: any } = {
  image1: require("../assets/images/image1.jpg"),
  image2: require("../assets/images/image2.jpg"),
  image3: require("../assets/images/image3.jpg"),
};

const RenderItem = ({ item }: { item: ItemProps }) => {
  return (
    <View
      style={{
        backgroundColor: item.background_color,
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingHorizontal: 18,
        paddingVertical: 24,
      }}
    >
      {/* Set StatusBar color dynamically */}
      <StatusBar backgroundColor={item.background_color} barStyle="light-content" />

      <Image
        source={imageMap[item.imageUrl]} 
        style={{
          width: "100%",
          height: 450,
          borderRadius: 40,
          resizeMode: "contain",
          overflow: "hidden",
        }}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 10,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            textAlign: "center",
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default RenderItem;
