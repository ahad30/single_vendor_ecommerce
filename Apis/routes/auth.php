<?php

use App\Http\Controllers\Auth\AuthenticateSessionController;
use App\Http\Controllers\Profile\UserProfileController;
use App\Http\Controllers\Auth\RegisterUserController;
use Illuminate\Support\Facades\Route;


// guest routes
Route::post('/login', [AuthenticateSessionController::class, 'login']);
Route::post('/registration', [RegisterUserController::class, 'register']);

// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [UserProfileController::class, 'profile']);
    // logged in user with role & permissions
    Route::get('/me', [AuthenticateSessionController::class, 'loggedUser']);
    // logout api
    Route::post('/logout', [AuthenticateSessionController::class, 'logout']);
});
