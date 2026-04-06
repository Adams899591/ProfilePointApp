import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {API_URL} from "../server/config"
import {
  Alert,
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
import { UserContext } from "../(tabs)/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersonalInfo = () => {

    const context = useContext(UserContext); 
      // Safely extract user.
  const user = context?.user;

  const router = useRouter();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [bio, setBio] = useState(user?.bio);

  // this handles all the error on this page 
  const [errorObject, setErrorObject] = useState({});




  // haldle Submit
 const haldleSubmit = async () => {

      try {

              setErrorObject({}); // Clear previous errors

              const responce = await axios.post(`${API_URL}/user/personalInfo/${user?.id}`,{
                  name: name.trim(),
                  email: email.trim(),
                  phone: phone.trim(),
                  bio: bio.trim(),
              });

              const data = responce.data;

              if (data.status === "success") {
                    //1. Save the user data to global context for access across the app
                    context?.setUser(data.user);
                   
                    //2. remove the "User" item from local storage 
                    await AsyncStorage.removeItem("user");

                    //3. Save the user data to AsyncStorage for persistence across app restarts
                    await AsyncStorage.setItem("user", JSON.stringify(data.user));                   
                   
                    // 4. give a feedback Alert to the user 
                   Alert.alert("Success", data.message, [
                    {title: "OK", onPress: () => router.back()}
                   ])    
              }
              
      } catch (error) {

             const data = error.response?.data; // Safely extract response data if it exists
                
              // validation error from Laravel
              if (data?.errors) { // check if there are validation errors in the response
                setErrorObject({
                  name: data.errors.name?.[0],
                  email: data.errors.email?.[0],
                  phone: data.errors.phone?.[0],
                  bio: data.errors.bio?.[0],
                });
              } else {
                // other errors (e.g. connection issues)
                const message = data?.message || "Connection failed. Please check if the server is running.";
                Alert.alert("Login Failed", message);
              }
        //  console.log(error);
      }
  }



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
          <TouchableOpacity onPress={() => haldleSubmit()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoBox}>
            <Text style={styles.infoNote}>
              Your personal information is encrypted and visible only to you.
            </Text>
          </View>
          
          {/* Name */}
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
               {/* Name Error */}
                {errorObject.name ? ( // Corrected syntax for optional chaining
                  <Text style={{ color: "red", marginTop: 4 }}>{errorObject.name}</Text>
                ) : null}
          </View>


          {/* Email */}
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
            {errorObject.email ? (
              <Text style={{ color: "red", marginTop: 4 }}>{errorObject.email}</Text>
            ) : null}
          </View>

           {/* Phone */}
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
            {errorObject.phone ? (
              <Text style={{ color: "red", marginTop: 4 }}>{errorObject.phone}</Text>
            ) : null}
          </View>

          {/* Bio */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Short Bio</Text>
            <View
              style={[
                styles.inputWrapper,
                { alignItems: "flex-start", height: 'auto', paddingVertical: 12 },
              ]}
            >
              <TextInput
                style={[styles.input, {height: 100, textAlignVertical: "top"}]}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={5}
                placeholder="Tell us about yourself"
              />
            </View>
            {errorObject.bio ? (
              <Text style={{ color: "red", marginTop: 4 }}>{errorObject.bio}</Text>
            ) : null}
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
