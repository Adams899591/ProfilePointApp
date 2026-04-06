import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { API_URL } from "../server/config";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../(tabs)/UserContext";

const PrivacySecurity = () => {

  const router = useRouter();
  const context = useContext(UserContext);
  const user = context?.user;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to track if biometrics are enabled in the app
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(user?.biometric_token ? true : false);


  // State to control the simulated setup modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to track the simulated "scanning" progress (0 to 5 taps)
  const [touchCount, setTouchCount] = useState(0);

  console.log(JSON.stringify(user, null, 2));
  

  // Function to generate a 16-character random string (The "Crystal")
  const generateBiometricToken = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Logic to handle the toggle button click
  const handleToggleBiometric =  async () => {
    if (isBiometricEnabled) {
 
           // 1. remove the biometric_token token from  device local storage
          await AsyncStorage.removeItem("biometric_token");

          // 2. Send the User id  to Laravel to remove biometric_token from database
          await axios.post(`${API_URL}/auth/remove-biometric/${user?.id}`, {
            user_id: user?.id,
          });

          // If already enabled, just turn it off
          setIsBiometricEnabled(false);

          Alert.alert("Authentication Disabled", "fingerprint has been disabled.");
    } else {
      // If disabled, reset progress and show the "setup" modal
      setTouchCount(0);
      setIsModalVisible(true);
    }
  };

  // Logic for the simulated fingerprint setup taps
  const handleFingerprintTouch = async () => {
    // Add haptic feedback for every tap
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (touchCount < 4) {
      // Increment the progress count until the 5th tap
      setTouchCount(prev => prev + 1);
    } else {
      setTouchCount(5); // Final stage reached
      
      // Trigger the ACTUAL OS Biometric prompt
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your fingerprint to enable biometric security",
      });

      if (result.success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        try {
          const newToken = generateBiometricToken(); 

           await SecureStore.setItemAsync("biometric_token", newToken);

          // 1. Save the token locally on the device
          await AsyncStorage.setItem("biometric_token", newToken);

          // 2. Send the token to Laravel to link it with this user
          await axios.post(`${API_URL}/api/auth/update-biometric/${user?.id}`, {
            user_id: user?.id,
            biometric_token: newToken,
          });

         

          setIsBiometricEnabled(true);
          setIsModalVisible(false);
          Alert.alert("Authentication Successful", "Your fingerprint has been verified and enabled.");
        } catch (error) {
          console.error("Failed to sync biometric token", error);
          Alert.alert("Error", "Could not link biometrics to your account. Please try again.");
        }
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Verification Failed", "Fingerprint not recognized by the system sensor.");
        setTouchCount(0); // Reset UI progress on failure
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >

        {/* arrow that direct user back to home page */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy & Security</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Change Password</Text>
            <Text style={styles.sectionDescription}>
              Protect your account by using a strong password that you don't use
              elsewhere.
            </Text>

            {/* Current Password */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-outline" size={20} color="#64748B" />
                <TextInput
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  placeholder="••••••••"
                />
              </View>
            </View>

            {/* New Password */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-outline" size={20} color="#64748B" />
                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="••••••••"
                />
              </View>
            </View>

            {/* Confirm New Password */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-outline" size={20} color="#64748B" />
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholder="••••••••"
                />
              </View>
            </View>
      
            {/* password button */}
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                alert("Password updated successfully!");
                router.back();
              }}
            >
              <Text style={styles.updateButtonText}>Update Password</Text>
            </TouchableOpacity>

          </View>

           {/*Section For Security Features */}
          <View style={[styles.section, { marginTop: 20 }]}>
            <Text style={styles.sectionTitle}>Security Features</Text>

             {/* Two-Factor Authentication */}
            <TouchableOpacity style={styles.securityOption}>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>
                  Two-Factor Authentication
                </Text>
                <Text style={styles.optionSubtitle}>
                  Recommended for better security
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
            </TouchableOpacity>

            {/* Interactive Biometric Authentication Toggle */}
            <TouchableOpacity 
              style={styles.securityOption}
              onPress={handleToggleBiometric}
            >
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Biometric Authentication</Text>
                <Text style={styles.optionSubtitle}>
                  Use FaceID or Fingerprint
                </Text>
              </View> 
              <MaterialIcons  
                name={isBiometricEnabled  ? "toggle-on" : "toggle-off"} 
                size={32} 
                color={isBiometricEnabled ? "#10B981" : "#CBD5E1"} 
              />
            </TouchableOpacity>

            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Bottom Modal for Fingerprint Setup Simulation */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Enable Fingerprint</Text>
            <Text style={styles.modalSubtitle}>
              {touchCount === 5 
                ? "Verifying with system sensor..." 
                : `Scanning lines... (${touchCount}/5 completed)`}
            </Text>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleFingerprintTouch}
              style={[styles.fingerprintTouchArea, touchCount > 0 && { borderColor: '#10B981' }]}
            >
              <View style={styles.fingerprintIconWrapper}>
                {/* Base background icon (Grey) */}
                <MaterialIcons name="fingerprint" size={120} color="#E2E8F0" />
                
                {/* The Green "Scan" overlay that materializes line-by-line via opacity */}
                <View style={[styles.fingerprintScanOverlay, { opacity: touchCount * 0.2 }]}>
                  <View style={{ position: "absolute" }}>
                    <MaterialIcons name="fingerprint" size={120} color="#10B981" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelModalBtn}>
              <Text style={styles.cancelModalText}>Cancel Setup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PrivacySecurity;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  scrollContent: { padding: 24 },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 24,
    lineHeight: 20,
  },
  inputSection: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  input: { flex: 1, marginLeft: 12, fontSize: 15, color: "#1E293B" },
  updateButton: {
    backgroundColor: "#4F46E5",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  updateButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  securityOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  optionInfo: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: "600", color: "#334155" },
  optionSubtitle: { fontSize: 13, color: "#64748B", marginTop: 2 },
  // New Modal Styles for Fingerprint Setup
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    alignItems: "center",
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#1E293B", marginBottom: 10 },
  modalSubtitle: { fontSize: 14, color: "#64748B", textAlign: "center", marginBottom: 30 },
  fingerprintTouchArea: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 30,
  },
  fingerprintIconWrapper: { 
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center' 
  },
  fingerprintScanOverlay: {
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelModalBtn: { marginTop: 10 },
  cancelModalText: { color: "#EF4444", fontWeight: "600" },
});
