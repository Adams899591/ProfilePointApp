<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;

// php artisan serve --host=10.39.154.166 --port=8000        used to start the server with the specified IP and port
//php artisan route:list --path=api         used to list all the routes in the application, filtering by those that start with "api"
// php artisan install:api          used to install the API routes and controllers for authentication and user management in the application


Route::get('/', function () {
    return view('welcome');
});
