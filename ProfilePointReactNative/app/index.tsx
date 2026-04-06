import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { API_URL } from "./server/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import {
  Alert,
  Button, 
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
      // Clear previous errors
      setEmailError("");
      setPasswordError("");
      
      // Send POST request to Laravel API for authentication
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      }); // cite: 1

      const data = response.data;
      if (data.status === "success") {
          // Store the token in SecureStore (it survives logouts)
          // if (data.user.biometric_token) {
          //   await SecureStore.setItemAsync("biometric_token", data.user.biometric_token);
          //   delete data.user.biometric_token;
          // }

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
      if (data?.errors) { // check if there are validation errors in the response
        setEmailError(data.errors.email?.[0] || "");
        setPasswordError(data.errors.password?.[0] || "");
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
    setIsLoading(true); // Start loading for biometric process

    try {
      // 1. Fetch the biometric token from SecureStore
      const biometricToken = await SecureStore.getItemAsync("biometric_token");

      if (!biometricToken) {
        Alert.alert(
          "Biometric Login",
          "No biometric token found. Please log in with your email and password first to enable it.",
        );
        return;
      }

      // 3. Check for biometric hardware compatibility
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert(
          "Unsupported",
          "This device does not support biometric login.",
        );
        return;
      }

      // 4. Check if biometrics are enrolled
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert(
          "Not Set Up",
          "Please set up biometrics in your phone settings.",
        );
        return;
      }

      // 5. Authenticate with biometrics
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Sign in with Fingerprint",
        fallbackLabel: "Use Password",
      });

      if (result.success) {
        // Biometric authentication successful, now verify the stored token with the backend
        try {
          // Send only the token. Laravel will find the user based on this unique token.
          const verifyResponse = await axios.post(`${API_URL}/auth/verify-biometric/${biometricToken}`, {
            biometric_token: biometricToken,
          });

          if (verifyResponse.data.status === "success") {
            // Token is valid, update context (if necessary) and navigate
            // It's good practice to re-save the user data, in case the backend refreshed the token or user details
            await AsyncStorage.setItem("user", JSON.stringify(verifyResponse.data.user));
            context?.setUser(verifyResponse.data.user);

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setBiometricStatus("success");
            setTimeout(() => {
              setBiometricStatus("idle");
              router.replace("/home");
            }, 1500);
          } else {
            // Backend indicates token is invalid or expired
            Alert.alert("Biometric Login Failed", verifyResponse.data.message || "Your biometric session has expired. Please log in with your credentials.");
            setBiometricStatus("idle");
          }
        } catch (apiError: any) {
          console.error("Token verification error:", apiError);
          const message = apiError.response?.data?.message || "Could not verify biometric token. Please log in with your credentials.";
          Alert.alert("Biometric Login Failed", message);
          setBiometricStatus("idle");
        }
      } else {
        // Biometric authentication failed or user cancelled
        Alert.alert("Biometric Authentication", "Biometric authentication failed or cancelled.");
        setBiometricStatus("idle");
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert("Biometric Error", "An unexpected error occurred during biometric authentication.");
      setBiometricStatus("idle");
    } finally {
      setIsLoading(false); // End loading for biometric process
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
              {emailError ? ( // Corrected syntax for optional chaining
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
              {passwordError ? ( // Corrected syntax for optional chaining
                <Text style={{ color: "red", marginTop: 4 }}>{passwordError}</Text>
              ) : null}
            </View>

            <View style={styles.actionRow}>

              {/* Login button */}
              <TouchableOpacity
                style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
                activeOpacity={0.7}
                onPress={handleSubmit}
                disabled={isLoading} // Disable login button during any loading
              >
                {isLoading && biometricStatus === "idle" ? ( // Only show spinner if login is loading, not biometric success animation
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
                  isLoading && { opacity: 0.7 } // Disable biometric button during any loading
                ]}
                activeOpacity={0.7}
                onPress={handleBiometricAuth}
                disabled={isLoading} // Disable biometric button during any loading
              >
                {isLoading && biometricStatus !== "success" ? ( // Show spinner if biometric is loading and not yet success
                  <ActivityIndicator color="#007AFF" /> // Or a different color for biometric spinner
                ) : (
                  <MaterialIcons
                    name={biometricStatus === "success" ? "check" : "fingerprint"}
                    size={32}
                    color={biometricStatus === "success" ? "#fff" : "#007AFF"}
                  />
                )}
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
              disabled={isLoading} // Disable Google button during any loading
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
