<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Response;

class GetOnlyCategoryName extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        // Get the category name
        $categories = Category::orderBy('name', 'asc')->get(['id', 'name']);
        return Response::success($categories);
    }
}
