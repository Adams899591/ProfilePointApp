import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React from "react";
import { Platform } from "react-native";

// Create a custom wrapper for Material Top Tabs to work with Expo Router
const MaterialTopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator,
);

const TabLayout = () => {
  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: "#1E293B", // Unified Dark Professional Color
        tabBarInactiveTintColor: "#8E8E93",
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          textTransform: "none",
        },
        tabBarIndicatorStyle: {
          height: 0, // Hide the top-tab indicator line to look like bottom tabs
        },
        tabBarItemStyle: {
          height: Platform.OS === "ios" ? 80 : 70,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
          height: 90,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="house" size={28} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="explore" size={28} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="assignment" size={28} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="person" size={28} color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
};

export default TabLayout;
