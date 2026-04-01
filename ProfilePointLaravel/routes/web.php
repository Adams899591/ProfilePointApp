<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;

// php artisan serve --host=10.39.154.166 --port=8000        used to start the server with the specified IP and port
//php artisan route:list --path=api         used to list all the routes in the application, filtering by those that start with "api"
// php artisan install:api          used to install the API routes and controllers for authentication and user management in the application



// break down of all the package used 
    //  1. // this 
// npx expo install @react-native-async-storage/async-storage

/*
|--------------------------------------------------------------------------
| ProfilePoint Project - Mobile Packages Overview
|--------------------------------------------------------------------------
|
| This section outlines the key packages installed and utilized in the 
| React Native frontend to handle API communication, security, and UI.
|
| #1 axios
|    Installation: npx expo install axios
|    Purpose: Handles all HTTP requests. It is used to communicate with 
|    the Laravel backend for user registration, login, and data fetching.
|
| #2 expo-haptics
|    Installation: npx expo install expo-haptics
|    Purpose: Provides physical feedback. It triggers vibrations on the 
|    device to confirm successful actions like logging in or refreshing 
|    the task list.
|
| #3 expo-local-authentication
|    Installation: npx expo install expo-local-authentication
|    Purpose: Biometric security. This allows the "Fingerprint" login 
|    feature to work by accessing the device's native biometric hardware.
|
| #4 @react-native-async-storage/async-storage
|    Installation: npx expo install @react-native-async-storage/async-storage
|    Purpose: Persistent storage. It stores the user's data locally on 
|    the phone so that they remain logged in even after refreshing or 
|    closing the app.
|
| #5 expo-router
|    Installation: npx expo install expo-router
|    Purpose: Navigation. It manages the app's routing structure, 
|    allowing for smooth transitions between the login, signup, and 
|    dashboard screens.
|
| #6 expo-linear-gradient
|    Installation: npx expo install expo-linear-gradient
|    Purpose: Professional UI styling. Used to create the smooth color 
|    gradients in the headers of the Home and Explore screens.
|
| #7 react-native-gesture-handler
|    Installation: npx expo install react-native-gesture-handler
|    Purpose: Advanced touch interaction. Specifically used to enable 
|    the "Swipe-to-Delete" gesture found in the Tasks screen.
|
| #8 react-native-safe-area-context
|    Installation: npx expo install react-native-safe-area-context
|    Purpose: Layout consistency. It ensures the app UI stays within 
|    visible boundaries, avoiding overlaps with the phone's notch or 
|    bottom indicator bars.
|
| #9 @expo/vector-icons
|    Installation: npx expo install @expo/vector-icons
|    Purpose: Iconography. Provides the MaterialIcons used for input 
|    fields, navigation tabs, and action buttons.
|
*/

Route::get('/', function () {
    return view('welcome');
});
