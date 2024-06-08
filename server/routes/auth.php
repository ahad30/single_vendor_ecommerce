<?php

use App\Http\Controllers\Auth\AuthenticateSessionController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Profile\UserProfileController;
use Illuminate\Support\Facades\Route;


// guest routes
Route::post('/login', [AuthenticateSessionController::class, 'login']);
Route::post('/user/registration', [RegisterUserController::class, 'register']);

/*========= Authenticate Routes Section ========*/
Route::middleware('auth:sanctum')->group(function () {
    // user profile routes
    Route::controller(UserProfileController::class)->group(function () {
        Route::get('/profile', 'profile');
        Route::put('/profile', 'updateProfile')->name('user.profile');
        Route::put('/profile/password', 'updatePassword');
    });

    // logout api
    Route::post('/logout', [AuthenticateSessionController::class, 'logout']);
});
