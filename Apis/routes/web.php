<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/products', function () {
//     // Eager load the relationships
//     $products = Product::with([
//         'varients.varientValues',
//         'attributes.attributeValues'
//     ])->get();

//     $product = Product::with([
//         'varients.varientValues',
//         'attributes.attributeValues'
//     ])->find(2);

//     return response()->json($product);
// });
