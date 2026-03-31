import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification 1: Task Added */}
        <View style={styles.notificationCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#EEF2FF" }]}>
            <MaterialIcons name="assignment" size={24} color="#4F46E5" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Task Added</Text>
            <Text style={styles.notificationDescription}>
              "Design Landing Page" has been successfully added to UI Design.
            </Text>
            <Text style={styles.notificationTime}>5 minutes ago</Text>
          </View>
        </View>

        {/* Notification 2: Task Completed */}
        <View style={styles.notificationCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#F0FDF4" }]}>
            <MaterialIcons name="check-circle" size={24} color="#10B981" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Task Completed</Text>
            <Text style={styles.notificationDescription}>
              "Fix Login Bug" in Development is marked as completed.
            </Text>
            <Text style={styles.notificationTime}>2 hours ago</Text>
          </View>
        </View>

        {/* Notification 3: Task Priority Alert */}
        <View style={styles.notificationCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#FEF2F2" }]}>
            <MaterialIcons name="priority-high" size={24} color="#EF4444" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>High Priority Task</Text>
            <Text style={styles.notificationDescription}>
              "Client Meeting" is scheduled for today. Don't forget!
            </Text>
            <Text style={styles.notificationTime}>4 hours ago</Text>
          </View>
        </View>

        {/* Notification 4: Task Updated */}
        <View style={styles.notificationCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#FFF7ED" }]}>
            <MaterialIcons name="edit" size={24} color="#F59E0B" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Task Updated</Text>
            <Text style={styles.notificationDescription}>
              "Update Documentation" was edited in DevOps.
            </Text>
            <Text style={styles.notificationTime}>Yesterday</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#fff",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  scrollContent: { padding: 20 },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  notificationTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  notificationDescription: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  notificationTime: { fontSize: 11, color: "#94A3B8", marginTop: 6 },
});
