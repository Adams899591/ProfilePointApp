<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class BiometricSetUPController extends Controller
{


    // this function update Biometric using the token passed on the request
    public function updateBiometricSetUp(Request $request, $userId){
          // get the user by ID
          $user = User::find($userId);
            if (!$user) {
                return response()->json(['status' => 'error', 'message' => 'User not found.'], 404);
            }
            // save the biometric token to the user's record
            $user->biometric_token = $request->biometric_token;
            $user->save();
            return response()->json(['status' => 'success', 'message' => 'Biometric token updated successfully.'], 200);
         
    }

    // this function Remove Biometric SetUp by setting it to null
    public function removeBiometricSetUp(Request $request, $userId){
        // get the user by ID

        $user = User::find($userId); // check if the user exists

        
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found.'], 404);
        }
        // remove the biometric token from the user's record
        $user->biometric_token = null;
        $user->save();
    }
}
