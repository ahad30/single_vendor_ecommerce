<?php

use App\Http\Controllers\Auth\AuthenticateSessionController;
use App\Http\Controllers\Auth\RegisterUserController;
use Illuminate\Support\Facades\Route;


// guest routes
Route::post('/login', [AuthenticateSessionController::class, 'login']);
Route::post('/registration', [RegisterUserController::class, 'register']);

// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {
    // logout api
    Route::post('/logout', [AuthenticateSessionController::class, 'logout']);
});
