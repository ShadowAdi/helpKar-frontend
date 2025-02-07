import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "@/Styles/GlobalColors";
import PagerView from "react-native-pager-view";
import Entypo from "@expo/vector-icons/Entypo";
import Video from "react-native-video";
import { GetItemFromLocalStorage } from "@/utils/StorageToken";
import { AuthContext } from "@/context/UserContext";

const SingleIssueScreen = () => {
  const [singleIssueData, setSingleIssueData] = useState<any>(null);
  const { issueId } = useLocalSearchParams();
  const { push, back } = useRouter();
  const [locationLoading, setLocationLoading] = useState(false);
  const userAuth = useContext(AuthContext);

  useEffect(() => {
    GetIssueById();
  }, [issueId]);

  const GetIssueById = useCallback(async () => {
    setLocationLoading(true);
    try {
      if (!issueId) return;
      console.log("Fetching issue with ID:", issueId);
      const response = await fetch(
        `http://192.168.29.209:3000/api/issues/issues/${issueId}`
      );
      const data = await response.json();
      setSingleIssueData(data?.issue);
    } catch (error) {
      console.error("Error fetching issue:", error);
      setSingleIssueData(null);
    } finally {
      setLocationLoading(false);
    }
  }, [issueId]);
  let daysPassed = 0;

  if (singleIssueData?.createdAt) {
    const createdAt = new Date(singleIssueData?.createdAt || "");
    const now = new Date();

    if (isNaN(createdAt.getTime())) {
      console.error("Invalid createdAt date:", singleIssueData?.createdAt);
    } else {
      const timeDifference = now.getTime() - createdAt.getTime();
      daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
  }

  const handleUpVote = async () => {
    const token = await GetItemFromLocalStorage("token");
    if (!token) {
      console.log("Token does not exist");
      return null;
    }
    try {
      const response = await fetch(
        `http://192.168.29.209:3000/api/issues/upvote/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert("Issue Upvoted", "Issue was Upvoted by the current User");
      }
      setLocationLoading(true);
      setSingleIssueData(null);
      GetIssueById();
    } catch (error) {
      console.log("Error occured in upvoting ", error);
      Alert.alert("Error ", "Error occured in upvoting " + error);
    }
  };

  const handleDownVote = async () => {
    const token = await GetItemFromLocalStorage("token");
    if (!token) {
      console.log("Token does not exist");
      return null;
    }
    try {
      const response = await fetch(
        `http://192.168.29.209:3000/api/issues/downvote/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setLocationLoading(true);
      setSingleIssueData(null);
      GetIssueById();
      if (response.status === 200) {
        Alert.alert(
          "Issue Downvoted",
          "Issue was Downvoted by the current User"
        );
      }
      setLocationLoading(true);
      setSingleIssueData(null);
      GetIssueById();
    } catch (error) {
      console.log("Error occured in upvoting ", error);
      Alert.alert("Error ", "Error occured in upvoting " + error);
    }
  };

  const FollowIssue = async () => {
    const token = await GetItemFromLocalStorage("token");
    if (!token) {
      console.log("Token does not exist");
      return null;
    }
    try {
      const response = await fetch(
        `http://192.168.29.209:3000/api/users/follow/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      setLocationLoading(true);
      setSingleIssueData(null);
      GetIssueById();
      if (response.status === 200) {
        Alert.alert(result?.message);
      }
    } catch (error) {
      console.log("Error occured in Following the Issue ", error);
      Alert.alert("Error ", "Error occured in Following The Issue " + error);
    }
  };

  const GetAccessOfIssue = async () => {
    const token = await GetItemFromLocalStorage("token");
    if (!token) {
      Alert.alert("Error", "Please login first");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.29.209:3000/api/ngos/issue-access/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const result = await response.json();
      setLocationLoading(true);
      GetIssueById();
      Alert.alert("Success", result?.message);
    } catch (error) {
      Alert.alert("Error", "Failed to access the issue. Please try again.");
      console.error(error);
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
      <TouchableOpacity
        onPress={() => {
          back();
        }}
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
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          justifyContent: "flex-start",
        }}
      >
        {singleIssueData?.issueMedia?.length !== 0 && (
          <PagerView
            style={{ width: "100%", borderRadius: 16, height: 400 }}
            initialPage={0}
          >
            {singleIssueData?.issueMedia?.map(
              (singleMedia: string, i: number) => {
                // Check if media is a video based on file extension
                const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(singleMedia);

                return isVideo ? (
                  <Video
                    key={i}
                    source={{ uri: singleMedia }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 16,
                    }}
                    resizeMode="cover"
                    controls={true} // Enable play/pause controls
                  />
                ) : (
                  <Image
                    key={i}
                    source={{ uri: singleMedia }}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 16,
                    }}
                  />
                );
              }
            )}
          </PagerView>
        )}

        <View
          style={{
            flexDirection: "column",
            gap: 4,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            borderBottomColor: "#c5c6d090",
            borderBottomWidth: 1,
            paddingBottom: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#000" }}>
            {singleIssueData?.issueName}
          </Text>
          <Text style={{ fontSize: 12, color: "#000", opacity: 0.8 }}>
            {singleIssueData?.issueDescription}
          </Text>

          {userAuth?.role === "ngo" ? (
            <TouchableOpacity
              onPress={() => {
                
                GetAccessOfIssue();
              }}
              style={{
                paddingVertical: 12,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.primaryColor,
                borderRadius: 100,
                paddingHorizontal: 16,
                marginTop: 24,
              }}
            >
              <Text style={{ color: Colors.whiteColor, fontSize: 12 }}>
                {singleIssueData?.assignedTo?.ngoIds?.some(
                  (ngo: any) => ngo._id === userAuth?.user?._id
                )
                  ? "Release Issue"
                  : "Request to Completion"}
              </Text>
            </TouchableOpacity>
          ) : userAuth?.role === "user" ? (
            <>
              {singleIssueData?.assignedTo?.ngoIds?.length > 0 && (
                <View
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: 12,
                    borderRadius: 8,
                    marginTop: 12,
                    marginBottom: 12,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.blackColor,
                      textAlign: "center",
                    }}
                  >
                    {singleIssueData?.assignedTo?.ngoIds[0]?.organizationName}
                    is working on this issue
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  FollowIssue();
                }}
                style={{
                  paddingVertical: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 100,
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ color: Colors.whiteColor, fontSize: 12 }}>
                  {singleIssueData?.issueFollowers?.includes(
                    userAuth?.user?._id
                  )
                    ? "Unfollow Issue"
                    : "Follow Issue"}
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {singleIssueData?.threatLevel && (
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 18,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#fff",
                flexDirection: "column",
                borderWidth: 2,
                borderColor: "#f0f0f0",
                paddingBottom: 4,
                minHeight: 60,
                maxHeight: 70,
              }}
            >
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "600" }}>
                Threat Level
              </Text>
              <Text style={{ fontSize: 12, color: "#000" }}>
                {singleIssueData.threatLevel}
              </Text>
            </View>
          )}
          {singleIssueData?.incidentCategory && (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#fff",
                flexDirection: "column",
                borderWidth: 2,
                borderColor: "#fbfcf8",
                minHeight: 60,
                maxHeight: 70,
              }}
            >
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "600" }}>
                Incident Type
              </Text>
              <Text style={{ fontSize: 12, color: "#000" }}>
                {singleIssueData.incidentCategory}
              </Text>
            </View>
          )}
          {singleIssueData?.category && (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#fff",
                flexDirection: "column",
                borderWidth: 2,
                borderColor: "#f0f0f0",
                minHeight: 60,
                maxHeight: 70,
              }}
            >
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "600" }}>
                Category
              </Text>
              <Text style={{ fontSize: 12, color: "#000" }}>
                {singleIssueData.category}
              </Text>
            </View>
          )}

          {singleIssueData?.issueFollowers && (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#fff",
                flexDirection: "column",
                borderWidth: 2,
                borderColor: "#f0f0f0",
                minHeight: 60,
                maxHeight: 70,
              }}
            >
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "600" }}>
                Followers
              </Text>
              <Text style={{ fontSize: 12, color: "#000" }}>
                {singleIssueData?.issueFollowers?.length}
              </Text>
            </View>
          )}
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
              <Text style={{ fontSize: 12 }}>
                {singleIssueData?.stateLocation}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>City:</Text>
              <Text style={{ fontSize: 12 }}>
                {singleIssueData?.cityLocation}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>Pincode:</Text>
              <Text style={{ fontSize: 12 }}>
                {singleIssueData?.locationPincode}
              </Text>
            </View>
          </View>

          {locationLoading || !singleIssueData?.location?.coordinates ? (
            <View
              style={{
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Text style={{ fontSize: 16, color: "#000" }}>
                Location is coming until it does not load...
              </Text>
            </View>
          ) : (
            <MapView
              style={{ width: "100%", height: 300, overflow: "hidden" }}
              region={{
                latitude: singleIssueData?.location?.coordinates[1] || 80.9098,
                longitude: singleIssueData?.location?.coordinates[0] || 26.8315,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude:
                    singleIssueData?.location?.coordinates[1] || 80.9098,
                  longitude:
                    singleIssueData?.location?.coordinates[0] || 26.8315,
                }}
                title="My Location"
                description="You are here"
              />
            </MapView>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                handleUpVote();
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                gap: 8,
                flexDirection: "row",
                borderWidth: 1,
                borderColor: Colors.primaryColor,
              }}
            >
              <Entypo name="arrow-up" size={18} color="black" />
              <Text style={{ fontSize: 12, color: Colors.blackColor }}>
                {singleIssueData?.upvotes?.length || 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDownVote();
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                gap: 8,
                flexDirection: "row",
                borderWidth: 1,
                borderColor: Colors.primaryColor,
              }}
            >
              <Entypo name="arrow-down" size={18} color="black" />
              <Text style={{ fontSize: 12, color: Colors.blackColor }}>
                {singleIssueData?.downvotes?.length || 0}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: "#fff",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: "#f0f0f0",
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 12, color: "#000", fontWeight: "600" }}>
              Status
            </Text>
            <Text style={{ fontSize: 10, color: "#000" }}>
              {singleIssueData?.status}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: "#fff",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: "#f0f0f0",
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 12, color: "#000", fontWeight: "600" }}>
              Total Days
            </Text>
            <Text style={{ fontSize: 10, color: "#000" }}>{daysPassed}</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: "#dadada",
              borderWidth: 2,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "flex-start",
              width: "80%",
              marginHorizontal: "auto",
              paddingVertical: 8,
              flexDirection: "column",
              paddingHorizontal: 18,
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: Colors.blackColor,
                fontWeight: "600",
              }}
            >
              {singleIssueData?.userId?.username}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.blackColor,
                fontWeight: "600",
                opacity: 0.7,
              }}
            >
              {singleIssueData?.userId?.email}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleIssueScreen;
