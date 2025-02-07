import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";
import { Colors } from "@/Styles/GlobalColors";
import { AuthContext } from "@/context/UserContext";
import RBSheet from "react-native-raw-bottom-sheet";

const Profile = () => {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  if (auth.role === "user") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          paddingHorizontal: 14,
          paddingVertical: 28,
          minHeight: "100%",
        }}
      >
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.whiteColor,
              fontWeight: "600",
            }}
          >
            Hello, {auth.user?.username}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: Colors.whiteColor,
              opacity: 0.7,
            }}
          >
            {auth.user?.email}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: Colors.whiteColor,
              opacity: 0.7,
            }}
          >
            {auth.user?.phoneNumber}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri:
                auth?.user?.profilePicture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18iwsdCCbBfpa50-5BmNa_m_BX087_x1oWQ&s",
            }}
            style={{
              height: 200,
              width: 200,
              objectFit: "cover",
              borderRadius: 200,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 48,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              backgroundColor: "#1f1d1b",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 14, color: Colors.whiteColor }}>
              City{" "}
            </Text>
            <Text
              style={{ fontSize: 14, color: Colors.whiteColor, opacity: 0.8 }}
            >
              {auth?.user?.location?.city}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              backgroundColor: "#1f1d1b",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 14, color: Colors.whiteColor }}>
              Pincode
            </Text>
            <Text
              style={{ fontSize: 14, color: Colors.whiteColor, opacity: 0.8 }}
            >
              {auth?.user?.location?.pincode}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              backgroundColor: "#1f1d1b",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 14, color: Colors.whiteColor }}>
              State
            </Text>
            <Text
              style={{ fontSize: 14, color: Colors.whiteColor, opacity: 0.8 }}
            >
              {auth?.user?.location?.state}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 28,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              backgroundColor: "#1f1d1b",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
              {auth.user?.followedIssues?.length}
            </Text>
            <Text
              style={{ fontSize: 12, color: Colors.whiteColor, opacity: 0.7 }}
            >
              Followed Issues
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              backgroundColor: "#1f1d1b",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
              {auth.user?.issues?.length}
            </Text>
            <Text
              style={{ fontSize: 12, color: Colors.whiteColor, opacity: 0.7 }}
            >
              Issues
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              backgroundColor: "#1f1d1b",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
              {auth.user?.notifications?.length}
            </Text>
            <Text
              style={{ fontSize: 12, color: Colors.whiteColor, opacity: 0.7 }}
            >
              Notifications
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              auth?.logout();
            }}
            style={{
              backgroundColor: Colors.primaryColor,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: Colors.whiteColor,
                fontWeight: "600",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  console.log("Token ", auth.token);
  console.log("Auth ", auth.user);

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
      style={{
        flex: 1,
        backgroundColor: "#000",
        minHeight: "100%",
      }}
    >
      <View style={{ flexDirection: "column", gap: 4, width: "100%" }}>
        <Image
          source={{ uri: auth?.user?.ngoProfile }}
          style={{
            height: 200,
            width: 200,
            objectFit: "contain",
            borderRadius: 100,
            marginVertical: 24,
            marginHorizontal: "auto",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: Colors.whiteColor,
              fontWeight: "500",
            }}
          >
            {auth.user?.organizationName}
          </Text>
          <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
            {auth.user?.description}
          </Text>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 12,
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 12, color: Colors.whiteColor }}>
              Contact Person - {auth.user?.contactPerson}
            </Text>
            <Text style={{ fontSize: 12, color: Colors.whiteColor }}>
              Phone Number- {auth.user?.phoneNumber}
            </Text>
            <Text style={{ fontSize: 12, color: Colors.whiteColor }}>
              Email- {auth.user?.email}
            </Text>
            <Text style={{ fontSize: 12, color: Colors.whiteColor }}>
              Project Manager Email - {auth.user?.projectManagerEmail}
            </Text>
            <Text style={{ fontSize: 12, color: Colors.whiteColor }}>
              Project Manager Name - {auth.user?.projectManager}
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 6, marginTop: 12 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Facebook
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                {auth?.user?.socialMediaLinks?.facebook}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Twitter
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                {auth?.user?.socialMediaLinks?.twitter}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Linkedin
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                {auth?.user?.socialMediaLinks?.linkedin}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                gap: 6,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Fields We Work
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {auth?.user?.fieldsOnWeWork?.fields?.map(
                  (field: string, i: number) => (
                    <View
                      key={i}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.whiteColor,
                          fontWeight: "500",
                        }}
                      >
                        {field}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                gap: 6,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Languages
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {auth?.user?.languagePreference?.map(
                  (lang: string, i: number) => (
                    <View
                      key={i}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.whiteColor,
                          fontWeight: "500",
                        }}
                      >
                        {lang}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                gap: 6,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Areas
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {auth?.user?.locationsWeWork?.areas?.map(
                  (area: string, i: number) => (
                    <View
                      key={i}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.whiteColor,
                          fontWeight: "500",
                        }}
                      >
                        {area}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
                gap: 6,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                Pincodes
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {auth?.user?.locationsWeWork?.pincodes?.map(
                  (area: string, i: number) => (
                    <View
                      key={i}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.whiteColor,
                          fontWeight: "500",
                        }}
                      >
                        {area}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  backgroundColor: "#1f1d1b",
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 10,
                  marginTop: 24,
                }}
              >
                <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
                  {auth.user?.issuesAssigned?.length}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.whiteColor,
                    opacity: 0.7,
                  }}
                >
                  Assigned Issue
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  backgroundColor: "#1f1d1b",
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 10,
                  marginTop: 24,
                }}
              >
                <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
                  {auth.user?.issuesResolved?.length}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.whiteColor,
                    opacity: 0.7,
                  }}
                >
                  Issue Resolved
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
