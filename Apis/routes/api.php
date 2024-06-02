<?php

use App\Http\Controllers\Api\Configuration\SliderController;
use App\Http\Controllers\Api\Ecommerce\AttributeController;
use App\Http\Controllers\Api\Ecommerce\BrandController;
use App\Http\Controllers\Api\Ecommerce\CategoryController;
use App\Http\Controllers\Api\Ecommerce\GetAtrributeValueController;
use App\Http\Controllers\Api\Ecommerce\ProductController;
use App\Http\Controllers\Api\Users\GetAllRoleName;
use App\Http\Controllers\Api\Users\PermissionController;
use App\Http\Controllers\Api\Users\RoleController;
use App\Http\Controllers\Api\Users\UserController;
use Illuminate\Support\Facades\Route;


// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {
    // all permissions by admin panel
    Route::get('/permissions', [PermissionController::class, 'index'])->middleware('permission:view permissions');

    // Role management routes
    Route::name('role.')->group(function () {
        Route::apiResource('roles', RoleController::class)->only(['index'])->middleware('permission:view role')->names(['index' => 'index']);

        Route::middleware('permission:create role')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:view role')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['show'])
                ->names(['show' => 'show']);
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

    // User management routes
    Route::name('user.')->group(function () {
        Route::apiResource('users', UserController::class)->only(['index'])->middleware('permission:view user')->names(['index' => 'index', 'show' => 'show']);

        Route::get('role/list', GetAllRoleName::class)->middleware('permission:view user');

        Route::middleware('permission:create user')->group(function () {
            Route::apiResource('users', UserController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit user')->group(function () {
            Route::apiResource('users', UserController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete user')->group(function () {
            Route::apiResource('users', UserController::class)->only(['destroy'])
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

    // brand management routes
    Route::name('brand.')->group(function () {
        Route::apiResource('brands', BrandController::class)->only(['index'])->middleware('permission:view brand')->names(['index' => 'index', 'show' => 'show']);

        Route::middleware('permission:create brand')->group(function () {
            Route::apiResource('brands', BrandController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit brand')->group(function () {
            Route::apiResource('brands', BrandController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete brand')->group(function () {
            Route::apiResource('brands', BrandController::class)->only(['destroy'])
                ->names(['destroy' => 'destroy']);
        });
    });

    // attribute management routes
    Route::name('attribute.')->group(function () {
        Route::apiResource('attributes', AttributeController::class)->only(['index'])->middleware('permission:view attribute')->names(['index' => 'index', 'show' => 'show']);

        Route::middleware('permission:create attribute')->group(function () {
            Route::apiResource('attributes', AttributeController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit attribute')->group(function () {
            Route::apiResource('attributes', AttributeController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete attribute')->group(function () {
            Route::apiResource('attributes', AttributeController::class)->only(['destroy'])
                ->names(['destroy' => 'destroy']);
        });
    });

    // Product management routes
    Route::name('product.')->group(function () {
        Route::apiResource('products', ProductController::class)->only(['index'])->middleware('permission:view product')->names(['index' => 'index', 'show' => 'show']);

        // get all attributes with values
        Route::get('products/attributes/values', GetAtrributeValueController::class)->middleware('permission:create product');

        Route::middleware('permission:create product')->group(function () {
            Route::apiResource('products', ProductController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit product')->group(function () {
            Route::apiResource('products', ProductController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete product')->group(function () {
            Route::apiResource('products', ProductController::class)->only(['destroy'])
                ->names(['destroy' => 'destroy']);
        });
    });

    // slider management routes
    Route::name('slider.')->group(function () {
        Route::apiResource('sliders', SliderController::class)->only(['index'])->middleware('permission:view slider')->names(['index' => 'index', 'show' => 'show']);

        Route::middleware('permission:create slider')->group(function () {
            Route::apiResource('sliders', SliderController::class)->only(['store'])
                ->names(['store' => 'store']);
        });

        Route::middleware('permission:edit slider')->group(function () {
            Route::apiResource('sliders', SliderController::class)->only(['update'])
                ->names(['update' => 'update']);
        });

        Route::middleware('permission:delete slider')->group(function () {
            Route::apiResource('sliders', SliderController::class)->only(['destroy'])
                ->names(['destroy' => 'destroy']);
        });
    });
});
