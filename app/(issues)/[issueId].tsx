import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "@/Styles/GlobalColors";
import Entypo from "@expo/vector-icons/Entypo";
const SingleIssueScreen = () => {
  const [singleIssueData, setSingleIssueData] = useState<any>(null);
  const { issueId } = useLocalSearchParams();

  useEffect(() => {
    GetIssueById();
  }, [issueId]);

  const GetIssueById = async () => {
    try {
      if (!issueId) {
        return null;
      }
      const response = await fetch(
        `http://localhost:3000/api/issues/issues/${issueId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Data ", data);
      setSingleIssueData(data);
    } catch (error) {
      console.log("Error ", error);
      setSingleIssueData(null);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#f0f0f0",
        gap: 24,
      }}
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 14,
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 14,
        }}
      >
        <Image
          style={{ height: 24, width: 24 }}
          source={require("../../assets/images/backIcon.png")}
        />
        <Text style={{ fontSize: 16, color: "#000" }}>Back</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          paddingVertical: 12,
          gap: 20,
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={{ width: "100%", borderRadius: 16, height: 400 }}
          source={{
            uri: "https://images.unsplash.com/photo-1684262483735-1101bcb10f0d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            gap: 4,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#000" }}>
            Pipeline ISse
          </Text>
          <Text style={{ fontSize: 12, color: "#000", opacity: 0.8 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            consectetur fugiat reiciendis officia molestiae molestias sunt eius
            alias temporibus, possimus nostrum. Eaque quam deleniti cumque
            voluptate facere vero aut? In ad aliquid fugit quod. Quasi tempora
            animi illum officiis commodi!
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 12,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", width: "100%", gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>State:</Text>
              <Text style={{ fontSize: 12 }}>Uttar Pardesh</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>City:</Text>
              <Text style={{ fontSize: 12 }}>Lucknow</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>Pincode:</Text>
              <Text style={{ fontSize: 12 }}>226004</Text>
            </View>
          </View>
          <MapView
            style={{ width: "100%", height: 300, overflow: "hidden" }}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              title="My Location"
              description="You are here"
            />
          </MapView>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 12,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", width: "100%", gap: 16 }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 14,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                gap: 8,
                backgroundColor: Colors.primaryColor,
              }}
            >
              <Entypo name="arrow-bold-up" size={24} color="white" />
              <Text style={{ fontSize: 12, color: "#000" }}>Upvote</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 14,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                gap: 8,
                backgroundColor: Colors.primaryColor,
              }}
            >
              <Entypo name="arrow-bold-down" size={24} color="white" />
              <Text style={{ fontSize: 12, color: "#000" }}>Down</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>Pincode:</Text>
              <Text style={{ fontSize: 12 }}>226004</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleIssueScreen;
