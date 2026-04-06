<?php

use App\Http\Controllers\Auth\BiometricSetUPController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\User\PersonalInfoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix("auth")->group(function(){

  Route::post('/login', [LoginController::class, 'authenticateLogin']);
  Route::post('/update-biometric/{userId}', [BiometricSetUPController::class, 'updateBiometricSetUp']);
  Route::post('/remove-biometric/{userId}', [BiometricSetUPController::class, 'removeBiometricSetUp']);
  Route::post('/verify-biometric/{biometric_token}', [BiometricSetUPController::class, 'verifyBiometricSetUp']);

});



Route::prefix("task")->group(function (){

    Route::post("fetchUserTask/{userId}", [TaskController::class, "fetchUserTask"]);
    Route::delete("deleteTask/{Id}", [TaskController::class, "deleteTask"]);
    Route::post("addtask", [TaskController::class, "addTask"]);
    Route::post("editTask", [TaskController::class, "editTask"]);


});


Route::prefix("user")->group(function(){
    Route::post("personalInfo/{userId}", [PersonalInfoController::class, "SaveUserPersonalInfo"]);
});
