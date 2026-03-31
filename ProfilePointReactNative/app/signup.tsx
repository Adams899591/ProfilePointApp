import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

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
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us today and start managing your tasks professionally
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputSection}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#94A3B8"
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Usman Adams"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="mail-outline" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-outline" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-outline" size={20} color="#94A3B8" />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              activeOpacity={0.8}
              onPress={() => router.replace("/home")}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.8}
              onPress={() => console.log("Google Sign Up Pressed")}
            >
              <View style={styles.googleIconWrapper}>
                <MaterialIcons name="mail" size={20} color="#EA4335" />
              </View>
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { paddingHorizontal: 20, paddingVertical: 10 },
  backButton: { width: 40, height: 40, justifyContent: "center" },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  titleSection: { marginBottom: 32, marginTop: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1E293B" },
  subtitle: { fontSize: 16, color: "#64748B", marginTop: 8 },
  form: { width: "100%" },
  inputSection: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  input: { flex: 1, marginLeft: 12, fontSize: 16, color: "#1E293B" },
  signUpButton: {
    backgroundColor: "#007AFF",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 4,
    shadowColor: "#007AFF",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  signUpButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 32 },
  footerText: { color: "#64748B", fontSize: 15 },
  signInText: { color: "#007AFF", fontWeight: "700", fontSize: 15 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#94A3B8",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  googleIconWrapper: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "600",
  },
});
