<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::latest()->paginate();
        $products = ProductResource::collection($data);

        // Merge the additional 'status' key with the paginated data
        $response = [
            'status' => true,
            'data' => $products,
            'meta' => [
                'active_page' => $data->currentPage() ? false : true,
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'next_page_url' => $data->nextPageUrl(),
                'prev_page_url' => $data->previousPageUrl(),
            ],
        ];

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $attributes = Attribute::pluck('id', 'name')->toArray();

        DB::transaction(function () use ($request, $attributes) {
            // Create the product
            $product = Product::create([
                'category_id' => $request['category_id'],
                'brand_id' => $request['brand_id'],
                'name' => $request['name'],
                'slug' => request('name')->str('slug')->slug('-'),
                'product_uid' => uniqid("PRD-"),
                'weight' => $request['weight'],
                'description' => $request['description'],
                'is_published' => $request['is_published'],
            ]);

            foreach ($request['variants'] as $variantData) {
                // Create the variant
                $variant = $product->variants()->create([]);

                // Attach attributes to the variant
                foreach ($variantData['attributes'] as $attributeName => $attributeValueName) {
                    $attributeId = $attributes[$attributeName];
                    $attributeValueId = Attribute::where('name', $attributeValueName)->first()->id;

                    $variant->attributes()->attach($attributeId, ['attribute_value_id' => $attributeValueId]);
                }

                // Create the variant values
                $variant->variantValues()->create([
                    'price' => $variantData['variant_values']['price'],
                    'quantity' => $variantData['variant_values']['quantity'],
                ]);
            }
        });

        return response()->json(['message' => 'Product created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
