import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/Styles/GlobalColors";
import { useRouter } from "expo-router";
import { CustomTabBar } from "@/components/CustomTopTab";
import { AuthContext } from "@/context/UserContext";

const DiscoverScreen = () => {
  const { push } = useRouter();
  const [issues, setIssues] = useState<any[]>([]);
  const [ngos, setNgos] = useState<any[]>([]);
  const [activeTabBar, setActiveTabBar] = useState("issue");

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `http://192.168.29.209:3000/api/issues/issues`
        );
        const data = await response.json();
        if (data.success) {
          setIssues(data.issues);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        Alert.alert("Error", "Could not fetch nearby issues.");
      }
    };
    const fetchNgos = async () => {
      try {
        const response = await fetch(
          `http://192.168.29.209:3000/api/ngos/allNgos`
        );
        const data = await response.json();
        console.log("ngo ", data);
        if (response.status === 200) {
          setNgos(data.data);
        }
      } catch (error) {
        console.error("Error fetching Ngos:", error);
        Alert.alert("Error", "Could not fetch  Ngos.");
      }
    };
    console.log("State Ngos ", ngos);
    fetchIssues();
    fetchNgos();
  }, [activeTabBar]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.issueName}</Text>
      <Text numberOfLines={4} style={styles.description}>
        {item.issueDescription.substring(0, 100)}
      </Text>
      <Text style={styles.location}>
        {item.cityLocation}, {item.stateLocation} - {item.locationPincode}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => push(`../(issues)/${item._id}`)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const RenderNgo = ({ item }: { item: any }) => (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#f0f0f030",
        flexDirection: "column",
        borderRadius: 12,
        gap: 20,
        backgroundColor: "#0e0c0a",
      }}
    >
      <View
        style={{
          gap: 24,
          alignItems: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Image
          source={{ uri: item.ngoProfile }}
          style={{
            height: 50,
            width: 50,
            objectFit: "contain",
            borderRadius: 100,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ fontSize: 16, color: Colors.whiteColor }}>
            {item.organizationName}
          </Text>
          <Text
            style={{ fontSize: 12, color: Colors.whiteColor, opacity: 0.7 }}
          >
            {item?.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "column", gap: 6 }}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              {item?.issuesAssigned?.length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              Issues Assigned
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              {item?.issuesResolved?.length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              Issues Resolved
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 6 }}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              {item?.phoneNumber}
            </Text>
          </View>
        
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      <CustomTabBar activeTab={activeTabBar} onTabPress={setActiveTabBar} />
      {activeTabBar === "issue" ? (
        issues.length !== 0 ? (
          <FlatList
            data={issues}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }} // Fix layout
          />
        ) : (
          <View
            style={{
              flexDirection: "column",
              gap: 6,
              width: "100%",
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 36,
                color: Colors.whiteColor,
                fontWeight: "500",
              }}
            >
              There No Issue Exists
            </Text>
            {auth?.role === "user" ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.whiteColor,
                    textAlign: "center",
                  }}
                >
                  If You Know Any Issues Please Create It
                </Text>
                <TouchableOpacity
                  style={{
                    width: "60%",
                    marginHorizontal: "auto",
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.primaryColor,
                    borderRadius: 100,
                  }}
                >
                  <Text style={{ fontSize: 12, color: Colors.whiteColor }}>
                    Create Issue
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.whiteColor,
                  textAlign: "center",
                }}
              >
                Here We will display all issues. If There is any issue You will
                know
              </Text>
            )}
          </View>
        )
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 26 }}
          style={{
            flexDirection: "column",
            width: "100%",
            gap: 16,
            paddingHorizontal: 12,
            paddingVertical: 16,
          }}
        >
          {ngos.length !== 0 ? (
            ngos?.map((ngo, i) => <RenderNgo item={ngo} key={i} />)
          ) : (
            <View
              style={{
                flexDirection: "column",
                gap: 6,
                width: "100%",
                marginTop: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 36,
                  color: Colors.whiteColor,
                  fontWeight: "500",
                }}
              >
                There No Ngo Exists
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 28,
    minHeight: "100%",
    width: "100%",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    color: Colors.whiteColor,
    fontWeight: "600",
  },
  card: {
    width: "48%", // Fix width for two-column layout
    backgroundColor: "#f0f0f0",
    marginBottom: 18,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 150,
    justifyContent: "space-between",
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginVertical: 5,
    flexShrink: 1, // Ensure text wraps
  },
  location: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
