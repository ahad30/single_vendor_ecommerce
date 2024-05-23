<?php

use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Profile\UserProfileController;
use Illuminate\Support\Facades\Route;


// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {

    // all permissions by admin panel
    Route::get('/permissions', [PermissionController::class, 'index']);

    // Role routes
    Route::apiResource('/roles', RoleController::class);

    // Category api
    Route::apiResource('category', CategoryController::class);
});
    