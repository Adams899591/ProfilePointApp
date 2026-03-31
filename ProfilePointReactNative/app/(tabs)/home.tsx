import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>


        {/* Professional Header with Linear Gradient */}
        <LinearGradient
          colors={["#1E293B", "#0F172A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, Usman!</Text>
              <Text style={styles.subtitle}>Your dashboard is ready</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => router.push("../Pages/notifications")}
                style={styles.notificationBtn}
              >
                <MaterialIcons name="notifications" size={28} color="#fff" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
                }}
                style={styles.profileImage}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Horizontal Scrolling Card Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            <LinearGradient
              colors={["#6366f1", "#4f46e5"]}
              style={styles.statCard}
            >
              <MaterialIcons name="trending-up" size={24} color="#fff" />
              <Text style={styles.statValue}>+24%</Text>
              <Text style={styles.statLabel}>Monthly Progress</Text>
            </LinearGradient>

            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.statCard}
            >
              <MaterialIcons
                name="assignment-turned-in"
                size={24}
                color="#fff"
              />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Tasks Finished</Text>
            </LinearGradient>

            <LinearGradient
              colors={["#f59e0b", "#d97706"]}
              style={styles.statCard}
            >
              <MaterialIcons
                name="notifications-active"
                size={24}
                color="#fff"
              />
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>New Alerts</Text>
            </LinearGradient>
          </ScrollView>
        </View>

        {/* Grid Action Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.iconGrid}>

            {/* payment */}
            <TouchableOpacity style={styles.gridItem}>
              <View
                style={[styles.iconWrapper, { backgroundColor: "#EEF2FF" }]}
              >
                <MaterialIcons name="payments" size={28} color="#4f46e5" />
              </View>
              <Text style={styles.gridLabel}>Payments</Text>
            </TouchableOpacity>

            {/* schedule */}
            <TouchableOpacity style={styles.gridItem}>
              <View
                style={[styles.iconWrapper, { backgroundColor: "#F0FDF4" }]}
              >
                <MaterialIcons
                  name="calendar-today"
                  size={28}
                  color="#10b981"
                />
              </View>
              <Text style={styles.gridLabel}>Schedule</Text>
            </TouchableOpacity>

             {/* analytics */}
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => setIsAnalyticsVisible(true)}
            >
              <View
                style={[styles.iconWrapper, { backgroundColor: "#FFF7ED" }]}
              >
                <MaterialIcons name="insert-chart" size={28} color="#f59e0b" />
              </View>
              <Text style={styles.gridLabel}>Analytics</Text>
            </TouchableOpacity>

            {/* settings */}
            <TouchableOpacity style={styles.gridItem}>
              <View
                style={[styles.iconWrapper, { backgroundColor: "#FDF2F2" }]}
              >
                <MaterialIcons name="settings" size={28} color="#ef4444" />
              </View>
              <Text style={styles.gridLabel}>Settings</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.logoutText}>Logout Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Analytics Slide-up Modal */}
      <Modal
        visible={isAnalyticsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAnalyticsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalDismissArea}
            activeOpacity={1}
            onPress={() => setIsAnalyticsVisible(false)}
          />
          <View style={styles.analyticsContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.analyticsTitle}>Task Analytics</Text>
               {/* icon that closed the model */}
              <TouchableOpacity onPress={() => setIsAnalyticsVisible(false)}>
                <MaterialIcons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.analyticsContent}>
              {[
                {
                  label: "High Priority",
                  count: 8,
                  progress: "40%",
                  color: "#ef4444",
                },
                {
                  label: "Medium Priority",
                  count: 12,
                  progress: "60%",
                  color: "#f59e0b",
                },
                {
                  label: "Low Priority",
                  count: 5,
                  progress: "25%",
                  color: "#10b981",
                },
              ].map((item, index) => (
                <View key={index} style={styles.analyticsRow}>
                  <View style={styles.analyticsInfo}>
                    <Text style={styles.priorityLabel}>{item.label}</Text>
                    <Text style={styles.priorityCount}>{item.count} Tasks</Text>
                  </View>
                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: item.progress,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

      </Modal>


    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  notificationBtn: {
    position: "relative",
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
    borderColor: "#1E293B",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
  },
  horizontalScrollContent: {
    gap: 16,
    paddingRight: 24,
  },
  statCard: {
    width: 140,
    padding: 20,
    borderRadius: 24,
    gap: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  footer: {
    marginVertical: 40,
    paddingHorizontal: 24,
  },
  logoutButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  logoutText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalDismissArea: {
    flex: 1,
  },
  analyticsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  analyticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  analyticsContent: {
    gap: 20,
  },
  analyticsRow: {
    gap: 8,
  },
  analyticsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
  priorityCount: {
    fontSize: 14,
    color: "#64748b",
  },
  progressBg: {
    height: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
});
