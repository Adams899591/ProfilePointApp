<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //  fetch all User Task using React Native UseEffect
    public function fetchUserTask($userId){

        // get the user by ID
        $user = User::with("tasks")->find($userId);

        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }
        
        // Calculate priority counts from the user's tasks relationship
        $low = $user->tasks->where("priority", "Low")->count();
        $medium = $user->tasks->where("priority", "Medium")->count();
        $high = $user->tasks->where("priority", "High")->count();


               return response()->json([
                                         'status' => 'success',
                                         'user' => $user,
                                         "low" => $low,
                                         "medium" => $medium,
                                         "high" => $high,
                                    ], 200);
    }


}
