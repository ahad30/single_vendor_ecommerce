<?php

namespace App\Http\Controllers\Api\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PackageResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SliderResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Package;
use App\Models\Product;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Cache duration in minutes
        $cacheDuration = 60;

        $data = Cache::remember('homepage_data', $cacheDuration, function () {
            return [
                'sliders' => SliderResource::collection(Slider::where('status', true)->latest()->get()),
                'categories' => CategoryResource::collection(Category::orderBy('name', 'ASC')->get()),
                'brands' => BrandResource::collection(Brand::orderBy('name', 'ASC')->get()),
                'products' => ProductResource::collection(Product::inRandomOrder()->get()),
                'packages' => PackageResource::collection(Package::inRandomOrder()->get()),
            ];
        });

        return Response::success($data);
    }
}
