<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
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

        $completed = $user->tasks->where("completed", true)->count();

        $totalTaskCount = $user->tasks->count();


               return response()->json([
                                         'status' => 'success',
                                         'user' => $user,
                                         "low" => $low,
                                         "medium" => $medium,
                                         "high" => $high,
                                         "completed" => $completed,
                                         "totalTaskCount" => $totalTaskCount,
                                    ], 200);
    }

    // handle delete user task 
    public function deleteTask($Id){

        $task = Task::find($Id);

        if (!$task) {
            return response()->json(['status' => 'error', 'message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['status' => 'success', 'message' => 'Task deleted successfully'], 200);


    }

    // handle add user task 
    public function addTask(Request $request){
        try {
            // 1. Validate the incoming data
            $validated = $request->validate([
                'user_id'   => 'required',
                'title'     => 'required|string',
                'category'  => 'nullable|string',
                'priority'  => 'required|string',
                'completed' => 'required|boolean',
            ]);

            $task = new Task();

            // 2. Map the validated data to your model properties
            // Note: Ensure these match your database column names exactly
            $task->user_id   = $validated['user_id']; 
            $task->title     = $validated['title'];
            $task->category  = $validated['category']; // Fixed typo from 'ccategory'
            $task->priority  = $validated['priority'];
            $task->completed = $validated['completed'];

            $task->save();

            return response()->json([
                'status'  => 'success',
                'message' => 'Task Added successfully',
                'task'    => $task
            ], 200);

        } catch (\Exception $e) {
            // 3. Catch the error and return the message so you can see it in your console
            return response()->json([
                'status'  => 'error',
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }

    }


    public function editTask(Request $request){
        try {
            // 1. Validate the incoming data
            $validated = $request->validate([
                'user_id'   => 'required',
                'title'     => 'required|string',
                'category'  => 'nullable|string',
                'priority'  => 'required|string',
                'completed' => 'required|boolean',
            ]);

            $task = new Task();

            // 2. Map the validated data to your model properties
            // Note: Ensure these match your database column names exactly
            $task->user_id   = $validated['user_id']; 
            $task->title     = $validated['title'];
            $task->category  = $validated['category']; // Fixed typo from 'ccategory'
            $task->priority  = $validated['priority'];
            $task->completed = $validated['completed'];

            $task->save();

            return response()->json([
                'status'  => 'success',
                'message' => 'Task Edited successfully',
                'task'    => $task
            ], 200);

        } catch (\Exception $e) {
            // 3. Catch the error and return the message so you can see it in your console
            return response()->json([
                'status'  => 'error',
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }
    }

}
