import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserContext } from "./(tabs)/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [user, setUser] = useState(null);


  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    // Check for stored user data when the app starts
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      }
    };
    loadUser();
  }, []);


  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </UserContext.Provider>
  );
}
