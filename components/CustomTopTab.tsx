import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/Styles/GlobalColors";

export const CustomTabBar = ({
  activeTab,
  onTabPress,
}: {
  activeTab: string;
  onTabPress: (text: string) => void;
}) => (
  <View
    style={{
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#707070",
      width: "100%",
      marginTop: 12,
      marginBottom:24
    }}
  >
    <TouchableOpacity
      style={[styles.tab, activeTab === "issue" && styles.activeTab]}
      onPress={() => onTabPress("issue")}
    >
      <Text
        style={[styles.tabText, activeTab === "issue" && styles.activeTabText]}
      >
        Issue
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === "ngos" && styles.activeTab]}
      onPress={() => onTabPress("ngos")}
    >
      <Text
        style={[styles.tabText, activeTab === "ngos" && styles.activeTabText]}
      >
        Ngos
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryColor,
  },
  tabText: {
    fontSize: 14,
    color: Colors.whiteColor,
    opacity: 0.5,
  },
  activeTabText: {
    opacity: 1,
  },
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  focusedTabItem: {
    color: "blue",
  },
  slidingIndicator: {
    position: "absolute",
    bottom: 0,
  },
  externalLink: {
    position: "absolute",
    right: 20,
    bottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
