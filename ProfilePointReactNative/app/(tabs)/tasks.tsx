import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {API_URL} from "../server/config";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // Swipeable,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { UserContext } from "./UserContext";

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  priority: string;
}


const TasksScreen = () => {
  
  // Sample data for the UI 
  const [tasks, setTasks] = useState<Task[]>([]);

  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskCategory, setEditTaskCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [progressCount, setProgressCount] = useState<number>(0);

  const context = useContext(UserContext);
      // Safely extract user.
  const user = context?.user;


  // handles OnRefresh
  const onRefresh = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  }, []);


 


  // handle Add Task
  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") {
      Alert.alert("Error", "Task title is required.");
      return;
    }

    try { 
          const response = await axios.post(`${API_URL}/task/addtask`, {
                            // Remove manual id; let the backend handle auto-increment
                            title: newTaskTitle,
                            category: newTaskCategory || "General",
                            completed: false,
                            priority: "Medium",
                            user_id: user?.id,

                        });

          const data = response.data;

          if (data.status === "success") {
            
            // Trigger haptic on adding a task
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            setTasks([...tasks, data.task]);
            setNewTaskTitle("");
            setNewTaskCategory("");
            setIsModalVisible(false);
          }
      
    } catch (error) {

      // console.error("Add Task Error:", error);
      if (axios.isAxiosError(error)) {
        // This helps you see the specific error returned by Laravel in your console
        console.log("Server Response:", error.response?.data);
        Alert.alert("Server Error", error.response?.data?.message || "Failed to add task");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  }

    // handle Edit Task
  const handleEditTask = async () => {
    
    if (editTaskTitle.trim() === "") {
      Alert.alert("Error", "Task title is required.");
      return;
    }

    try { 
          const response = await axios.post(`${API_URL}/task/editTask`, {
                            // Remove manual id; let the backend handle auto-increment
                            title: editTaskTitle,
                            category: newTaskCategory || "General",
                            completed: false,
                            priority: "High",
                            user_id: user?.id,

                        });

          const data = response.data;

          if (data.status === "success") {
            
            // Trigger haptic on adding a task
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            setTasks([...tasks, data.task]);
            setEditTaskTitle("");
            setEditTaskCategory("");
            setIsModalVisible(false);
          }
      
    } catch (error) {

      // console.error("Add Task Error:", error);
      if (axios.isAxiosError(error)) {
        // This helps you see the specific error returned by Laravel in your console
        console.log("Server Response:", error.response?.data);
        Alert.alert("Server Error", error.response?.data?.message || "Failed to add task");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  }


  const handleDeleteTask = async (id: number) => {

        try {
              // send responce to laravel
              const response = await axios.delete(`${API_URL}/task/deleteTask/${id}`);
          
              const data = response.data; 
  
              if (data.status === "success") { 

                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                setTasks(tasks.filter((task) => task.id !== id));
                Alert.alert("Alert",`${data.message}`);
                
              }

        } catch (error) {
            // console.log(error);
            // Alert.alert("Alert", "Task not found");
          
        }
    }


  // handle  toggle Task Completion 
  const toggleTaskCompletion = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  //  handle  render Right Actions
  const renderRightActions = (id: number) => {
    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => handleDeleteTask(id)}
      >
        <View style={styles.deleteActionContent}>
          <MaterialIcons name="delete-outline" size={28} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };



  // fetch all task by the login user
   useEffect(() => { 
     // 1. Guard against undefined user ID to avoid 404 on ".../undefined"
     if (!user?.id) return;
         
       async function fetchTasks() {
         try {
                   // 2. Send response to laravel 
                   const response = await axios.post(`${API_URL}/task/fetchUserTask/${user?.id}`, {
                    user_id: user?.id,
                   });

                  const data = response.data; // get the respose and assigned it to a value data
                  
                  // console.log(JSON.stringify(progressCount, null, 2));
                  
                  if (data.status === "success") {

                    setTasks(data.user.tasks); // Update this based on your API response structure

                    // calculate the passentage count using the data gotton from response
                    const progressCount =  ((data.completed  / data.totalTaskCount) * 100).toFixed();
                    setProgressCount(Number(progressCount));
                  }
           
         } catch (error) {
           console.error("Error fetching tasks:", error);
         }
        }
        
        fetchTasks();
   }, [user?.id, refreshing]) // 3. Re-run when user ID becomes available

 

 


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {/* Gradient Header */}
        <LinearGradient
          colors={["#1E293B", "#0F172A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Task Manager</Text>
              <Text style={styles.headerSubtitle}>
                You have 3 tasks for today
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => router.push("../pages/notifications")}
                style={styles.notificationBtn}
              >
                <MaterialIcons name="notifications" size={28} color="#fff" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
              >
                <MaterialIcons name="add" size={28} color="#1E293B" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Progress Overview */}
        <View style={styles.section}>
          <View style={styles.progressCard}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>Overall Progress</Text>
              <Text style={styles.progressValue}>{progressCount}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressCount}%` }]} />
            </View>
          </View>
        </View>

        {/* Task List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Tasks</Text>
          {tasks.map((task) => (
            
            // swipable
            <Swipeable
              key={task.id}
              renderRightActions={() => renderRightActions(task.id)}
              friction={2} // Controls the elasticity of the swipe
              rightThreshold={80} // How far to swipe to fully open and "stay"
              overshootRight={false} // Prevents swiping too far
            >

              {/* toggle Task Completion */}
              <TouchableOpacity
                style={styles.taskCard}
                onPress={() => toggleTaskCompletion(task.id)}
              >
                <View style={styles.taskMain}>
                  <MaterialIcons
                    name={
                      task.completed ? "check-circle" : "radio-button-unchecked"
                    }
                    size={26}
                    color={task.completed ? "#10B981" : "#CBD5E1"}
                  />
                  <View style={styles.taskDetails}>
                    <Text
                      style={[
                        styles.taskTitle,
                        task.completed && styles.completedText,
                      ]}
                    >
                      {task.title}
                    </Text>
                    <Text style={styles.taskCategory}>{task.category}</Text>
                  </View>
                </View>
                <View style={styles.taskActions}>

                   {/* setIsEditModalVisible */}
                  <TouchableOpacity
                    style={styles.taskEditButton}
                    onPress={() => setIsEditModalVisible(true)}
                  >
                    <MaterialIcons name="edit" size={20} color="#64748B" />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.priorityBadge,
                      {
                        backgroundColor:
                          task.priority === "High" ? "#FEE2E2" : "#F1F5F9",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        {
                          color:
                            task.priority === "High" ? "#EF4444" : "#64748B",
                        },
                      ]}
                    >
                      {task.priority}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity> 

            </Swipeable>
          ))}
        </View>

      </ScrollView>

      {/* Add Task Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Task</Text>

            {/* task name */}
            <View style={styles.modalInputSection}>
              <Text style={styles.modalLabel}>Task Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* task category */}
            <View style={styles.modalInputSection}>
              <Text style={styles.modalLabel}>Category</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g., Development, Design"
                value={newTaskCategory}
                onChangeText={setNewTaskCategory}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.modalActionRow}>
               
               {/* cancle */}
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              {/* save task */}
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddTask}
              >
                <Text style={styles.modalSaveText}>Save Task</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Task Modal UI */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Task</Text>

            <View style={styles.modalInputSection}>
              <Text style={styles.modalLabel}>Task Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Update task title"
                placeholderTextColor="#94A3B8"
                value={editTaskTitle}
                onChangeText={setEditTaskTitle}
              />
            </View>

            <View style={styles.modalInputSection}>
              <Text style={styles.modalLabel}>Category</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Update category"
                placeholderTextColor="#94A3B8"
                value={editTaskCategory}
                onChangeText={setEditTaskCategory}
              />
            </View>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleEditTask()}
                style={[styles.modalButton, styles.saveButton]}
              >
                <Text style={styles.modalSaveText}>Update Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};

export default TasksScreen;

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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
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
  addButton: {
    backgroundColor: "#fff",
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  progressValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1E293B",
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },
  deleteAction: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 20,
    marginBottom: 12,
    width: "100%",
  },
  deleteActionContent: {
    paddingHorizontal: 24,
    justifyContent: "center",
    height: "100%",
  },
  taskMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },
  taskCategory: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  taskActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskEditButton: {
    padding: 4,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },
  modalInputSection: {
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1E293B",
  },
  modalActionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F1F5F9",
  },
  saveButton: {
    backgroundColor: "#1E293B",
  },
  modalCancelText: {
    color: "#64748B",
    fontWeight: "600",
  },
  modalSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
