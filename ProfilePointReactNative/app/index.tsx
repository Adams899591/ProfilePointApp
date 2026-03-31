import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricStatus, setBiometricStatus] = useState<"idle" | "success">(
    "idle",
  );
  const router = useRouter();

  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert(
        "Unsupported",
        "This device does not support biometric login.",
      );
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert(
        "Not Set Up",
        "Please set up biometrics in your phone settings.",
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Sign in with Fingerprint",
      fallbackLabel: "Use Password",
    });

    if (result.success) {
      // Provide physical success feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      setBiometricStatus("success");

      setTimeout(() => {
        setBiometricStatus("idle");
        router.replace("/home");
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to your account to continue
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. usman@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.7}
                onPress={() => router.replace("/home")}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.biometricButton,
                  biometricStatus === "success" &&
                    styles.biometricButtonSuccess,
                ]}
                activeOpacity={0.7}
                onPress={handleBiometricAuth}
              >
                <MaterialIcons
                  name={biometricStatus === "success" ? "check" : "fingerprint"}
                  size={32}
                  color={biometricStatus === "success" ? "#fff" : "#007AFF"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.8}
              onPress={() => console.log("Google Login Pressed")}
            >
              <View style={styles.googleIconWrapper}>
                <MaterialIcons name="mail" size={20} color="#EA4335" />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  flex: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  biometricButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: { color: "#64748B", fontSize: 15 },
  signUpText: {
    color: "#007AFF",
    fontWeight: "700",
    fontSize: 15,
  },
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
  biometricButtonSuccess: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
});
