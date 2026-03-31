import { Stack } from "expo-router";

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="notifications" options={{ title: "Notifications", headerShown: true }} /> */}
    </Stack>
  );
}
