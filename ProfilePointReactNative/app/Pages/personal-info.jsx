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

const PersonalInfo = () => {
  const router = useRouter();
  const [name, setName] = useState("Usman Adams");
  const [email, setEmail] = useState("usman.adams@example.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [bio, setBio] = useState("Software Engineer based in Nigeria.");

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
          <Text style={styles.headerTitle}>Personal Info</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoBox}>
            <Text style={styles.infoNote}>
              Your personal information is encrypted and visible only to you.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person-outline" size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail-outline" size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Enter your email"
              />
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="phone-iphone" size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Short Bio</Text>
            <View
              style={[
                styles.inputWrapper,
                { alignItems: "flex-start", paddingTop: 12 },
              ]}
            >
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={bio}
                onChangeText={setBio}
                multiline
                placeholder="Tell us about yourself"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalInfo;

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
  saveText: { color: "#4F46E5", fontWeight: "700", fontSize: 16 },
  scrollContent: { padding: 24 },
  infoBox: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoNote: { fontSize: 13, color: "#64748B", lineHeight: 20 },
  inputSection: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
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
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#1E293B",
  },
});
