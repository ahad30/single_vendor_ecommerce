<?php

use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;


// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {
    // all permissions by admin panel
    Route::get('/permissions', [PermissionController::class, 'index'])->middleware('permission:view permissions');

    // Role management routes
    Route::name('roles.')->group(function () {
        Route::apiResource('roles', RoleController::class)->only(['index'])->middleware('permission:view role')->names(['index' => 'index', 'show' => 'show']);

        Route::middleware('permission:create role')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit role')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete role')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['destroy'])
                ->names(['destroy' => 'destroy']);
        });
    });


    // category management routes
    Route::name('category.')->group(function () {
        Route::apiResource('categories', CategoryController::class)->only(['index'])->middleware('permission:view category')->names(['index' => 'index', 'show' => 'show']);

        Route::middleware('permission:create category')->group(function () {
            Route::apiResource('categories', CategoryController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit category')->group(function () {
            Route::apiResource('categories', CategoryController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete category')->group(function () {
            Route::apiResource('categories', CategoryController::class)->only(['destroy'])
                ->names(['destroy' => 'destroy']);
        });
    });
});
