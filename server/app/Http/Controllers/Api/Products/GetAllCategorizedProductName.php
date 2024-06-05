<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategorizedProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class GetAllCategorizedProductName extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $query = $request->query->get('category_id');

        if ($query != null) {
            $products = CategorizedProductResource::collection(Product::where('category_id', $query)->with('skus')->get());
        }
        $products = CategorizedProductResource::collection(Product::with('skus')->get());

        return $products;
    }
}
