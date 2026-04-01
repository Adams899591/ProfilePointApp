import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header with Search */}
        <LinearGradient
          colors={["#1E293B", "#0F172A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.headerTitle}>Explore</Text>
                <Text style={styles.headerSubtitle}>
                  Discover new opportunities
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("../pages/notifications")}
                style={styles.notificationBtn}
              >
                <MaterialIcons name="notifications" size={28} color="#fff" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={22} color="#94A3B8" />
              <TextInput
                placeholder="Search resources..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {["Development", "Design", "Marketing", "Business", "Tech"].map(
              (item, index) => (
                <TouchableOpacity key={index} style={styles.categoryChip}>
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity style={styles.featuredCard}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
              }}
              style={styles.featuredImage}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.featuredOverlay}
            >
              <Text style={styles.featuredCardTitle}>
                Developer Roadmap 2024
              </Text>
              <Text style={styles.featuredCardSubtitle}>
                Master the latest tech stacks
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <View style={styles.trendingContainer}>

            {/* array section */}
            {[
              {
                id: 1,
                title: "UI/UX Best Practices",
                author: "Sarah J.",
                icon: "draw",
              },
              {
                id: 2,
                title: "Next.js 14 Tutorial",
                author: "Mike D.",
                icon: "code",
              },
              {
                id: 3,
                title: "Mobile App Marketing",
                author: "Alex K.",
                icon: "campaign",
              },
            ].map((item) => (
              <TouchableOpacity key={item.id} style={styles.trendingItem}>
                <View style={styles.itemIconContainer}>
                  <MaterialIcons
                    name={item.icon as any}
                    size={24}
                    color="#1E293B"
                  />
                </View>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemAuthor}>by {item.author}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1E293B",
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
  categoriesScroll: {
    gap: 12,
  },
  categoryChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  featuredCard: {
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredCardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  featuredCardSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
  },
  trendingContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    gap: 16,
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
  itemAuthor: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
});
