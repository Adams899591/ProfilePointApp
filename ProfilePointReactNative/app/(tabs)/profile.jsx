import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {

  const router = useRouter();

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
  );

  // pick Image
  const pickImage = async () => {
    // No permissions request is necessary for launchImageLibraryAsync on modern Expo versions
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // handles  take Photo
  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera permissions to make this work!",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  //  handles Edit Photo
  const handleEditPhoto = () => {
    Alert.alert(
      "Update Profile Picture",
      "Choose a source for your new profile image",
      [
        { text: "Take Photo", onPress: takePhoto },
        { text: "Choose from Gallery", onPress: pickImage },
        {
          text: "Remove Current",
          onPress: () => console.log("Photo removed"),
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile Header Gradient */}
        <LinearGradient
          colors={["#0F172A", "#1E293B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.profileHeader}>
            <TouchableOpacity
              onPress={() => router.push("../Pages/notifications")}
              style={styles.topNotificationBtn}
            >
              <MaterialIcons name="notifications" size={28} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editBadge}
                onPress={handleEditPhoto}
              >
                <MaterialIcons name="edit" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Usman Adams</Text>
            <Text style={styles.userEmail}>usman.adams@example.com</Text>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Account Settings</Text>

          {/* Personal Information */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Pages/personal-info")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#EEF2FF" }]}>
              <MaterialIcons name="person-outline" size={22} color="#4F46E5" />
            </View>
            <Text style={styles.menuText}>Personal Information</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("../Pages/notifications")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#F0FDF4" }]}>
              <MaterialIcons
                name="notifications-none"
                size={22}
                color="#10B981"
              />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Privacy & Security */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/Pages/privacy-security")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#FFF7ED" }]}>
              <MaterialIcons name="security" size={22} color="#F59E0B" />
            </View>
            <Text style={styles.menuText}>Privacy & Security</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>

        </View>

        
        {/* Support section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Support</Text>

           {/* Help Center */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: "#F8FAFC" }]}>
              <MaterialIcons name="help-outline" size={22} color="#64748B" />
            </View>
            <Text style={styles.menuText}>Help Center</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Sign Out */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: "#FEF2F2" }]}>
              <MaterialIcons name="logout" size={22} color="#EF4444" />
            </View>
            <Text style={[styles.menuText, { color: "#EF4444" }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
          
        </View>

        <Text style={styles.versionText}>Version 1.0.4 (Build 22)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  profileHeader: {
    alignItems: "center",
  },
  topNotificationBtn: {
    position: "absolute",
    top: 0,
    right: 24,
    zIndex: 10,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0F172A",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#1E293B",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 24,
    marginTop: -30,
    borderRadius: 24,
    paddingVertical: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#F1F5F9",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  menuSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#334155",
  },
  versionText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginVertical: 32,
  },
});
