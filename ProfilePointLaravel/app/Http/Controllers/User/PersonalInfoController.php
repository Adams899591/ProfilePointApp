<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class PersonalInfoController extends Controller
{

    //  handle  Save User Personal Info
    public function SaveUserPersonalInfo(Request $request, $userId){

     
      try {

           // validate user request
            $credentials = $request->validate([
                "name" => "required|string",
                'email' => 'required|email',
                'phone' => 'required|string',
                "bio" => 'required|string'
            ]);


          $user = User::findOrFail($userId);

            $user->name = $credentials["name"];
            $user->email= $credentials["email"];
            $user->phone = $credentials["phone"];
            $user->bio = $credentials["bio"];
            $user->save();
     
        return response()->json(['status' => 'success', 
                                 'message' => 'details updated successfully.',
                                 "user" => $user], 200);


      }catch(\Illuminate\Validation\ValidationException $ve) {   // Catch validation exceptions and return a structured error response

            // Return a JSON response with the validation errors and a 422 Unprocessable Entity status code
            return response()->json(['status' => 'error', 
                                      'message' => 'Validation Error: ' ,
                                      'errors' => $ve->errors()
                                      ], 422);

        }catch (\Exception $e) { // Catch any other exceptions and return a generic error response with the exception message
            return response()->json(['status' => 'error', 'message' => 'Server Error: ' . $e->getMessage()], 500);
        }
 
    }



}
