<?php

use App\Http\Controllers\Auth\AuthenticateSessionController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Profile\UserProfileController;
use Illuminate\Support\Facades\Route;


// guest routes
Route::post('/login', [AuthenticateSessionController::class, 'login']);
Route::post('/registration', [RegisterUserController::class, 'register']);

// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {
    // logged in user with role & permissions
    Route::get('/profile', [UserProfileController::class, 'profile']);
    // logout api
    Route::post('/logout', [AuthenticateSessionController::class, 'logout']);
});
