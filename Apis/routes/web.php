<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/products', function () {
    // Eager load the relationships
    $products = Product::with([
        'skus'
    ])->get();

    return response()->json($products);
});
