<?php

use App\Http\Controllers\Api\Frontend\HomeController;
use Illuminate\Support\Facades\Route;


/*========= Frontend Section ========*/

Route::get('/home', HomeController::class);

// Authenticate Routes
Route::middleware('auth:sanctum')->group(function () {
    //
});
