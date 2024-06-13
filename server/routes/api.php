<?php

use App\Http\Controllers\Api\Frontend\HomeController;
use App\Http\Controllers\Api\Users\OrderAddressController;
use Illuminate\Support\Facades\Route;


/*========= Frontend Section ========*/

Route::get('/home', HomeController::class);

// Authenticate Routes
Route::middleware('auth:sanctum')->prefix('user')->group(function () {
    Route::apiResource('addresses', OrderAddressController::class);
});
