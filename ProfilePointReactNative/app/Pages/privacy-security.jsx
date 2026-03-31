import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacySecurity = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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

          <View style={[styles.section, { marginTop: 20 }]}>
            <Text style={styles.sectionTitle}>Security Features</Text>

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

            <TouchableOpacity style={styles.securityOption}>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Biometric Authentication</Text>
                <Text style={styles.optionSubtitle}>
                  Use FaceID or Fingerprint
                </Text>
              </View>
              <MaterialIcons name="toggle-on" size={32} color="#10B981" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
});
