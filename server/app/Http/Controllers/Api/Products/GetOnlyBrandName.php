<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetOnlyBrandName extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Get the category name
        $categories = Brand::orderBy('name', 'asc')->get(['id', 'name']);
        return Response::success($categories);
    }
}
