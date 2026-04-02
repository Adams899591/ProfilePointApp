import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "./(tabs)/UserContext";

const LoginScreen = () => {
  // Consume the global context
  const context = useContext(UserContext);
 
  // State variables for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    // State variables for error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<"idle" | "success">(
    "idle",
  );



  const router = useRouter();



  // handle Submit with validation error handling
const handleSubmit = async () => {

   setIsLoading(true); // set loading state to true when starting the login process

   try {

      // Send POST request to Laravel API for authentication
     const response = await axios.post("http://10.39.154.166:8000/api/auth/login", {
       email: email.trim(),
       password: password.trim(),
     });

        const data = response.data; // assuming the API returns a JSON object with a 'status' field
 
        if (data.status === "success") {

          // Save the user data to AsyncStorage for persistence across app restarts
          await AsyncStorage.setItem("user", JSON.stringify(data.user));

          // Save the user data to global context for access across the app
          context?.setUser(data.user);
          
          // Successfully logged in
          router.replace("/home");
        } 

   } catch (error: any) { // handle errors from the API or network issues
         const data = error.response?.data; // Safely extract response data if it exists
      
      // validation error from Laravel
      if(data?.errors){ // check if there are validation errors in the response

        setEmailError(data.errors.email?. [0] || "");
        setPasswordError(data.errors.password?. [0] || "");

      } else {

        // other errors (e.g. connection issues)
        const message = data?.message || "Connection failed. Please check if the server is running.";
        Alert.alert("Login Failed", message);
      }


   } finally { // reset loading state after the login process is complete, regardless of success or failure
     setIsLoading(false);
   }
 };


  // handle Biometric Auth 
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

      // NOTE: In a real app, you'd fetch the stored user here
      // context?.setUser(storedUser); 

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

           {/* Welcome Back */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to your account to continue
            </Text>
          </View>

          <View style={styles.form}>

            {/* Email Address */}
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

              {/* emailError */}
              {emailError ? (
                  <Text style={{ color: "red", marginTop: 4 }}>{emailError}</Text>
                ) : null}

            </View>

             {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {/* passwordError */}
              {passwordError ? (
                <Text style={{ color: "red", marginTop: 4 }}>{passwordError}</Text>
              ) : null}
            </View>

            <View style={styles.actionRow}>

              {/* Login button */}
              <TouchableOpacity
              
                style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
                activeOpacity={0.7}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Biometric Auth */}
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
              
              {/* OR */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            {/* Continue with Google */}
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

              {/* direct user to sign up page */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() =>  router.push("/signup") }>
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
