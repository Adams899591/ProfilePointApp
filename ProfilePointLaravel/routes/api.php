<?php

use App\Http\Controllers\Auth\BiometricSetUPController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix("auth")->group(function(){

  Route::post('/login', [LoginController::class, 'authenticateLogin']);
  Route::post('/update-biometric/{userId}', [BiometricSetUPController::class, 'updateBiometricSetUp']);
  Route::post('/remove-biometric/{userId}', [BiometricSetUPController::class, 'removeBiometricSetUp']);
  Route::post('/verify-biometric/{biometric_token}', [BiometricSetUPController::class, 'verifyBiometricSetUp']);

});
