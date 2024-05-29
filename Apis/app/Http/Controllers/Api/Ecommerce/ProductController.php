<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Varient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
        // return $request->all();

        DB::transaction(function () use ($request, &$product) {

            // Create the product
            $product = Product::create([
                'name' => $request['name'],
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
                'description' => $request->description,
                'is_published' => $request->is_published,
                'list_type' => $request->list_type,
                'weight' => $request->weight,
                'slug' => Str::slug($request->name, '-'),
                'product_uid' => uniqid('PRD-'),
            ]);

            // Create the attributes and their values
            foreach ($request['attributes'] as $attributeData) {
                $attribute = Attribute::create(['name' => $attributeData['name']]);

                foreach ($attributeData['values'] as $valueData) {
                    $attributeValue = AttributeValue::create([
                        'attribute_id' => $attribute->id,
                        'value' => $valueData['value'],
                    ]);

                    // Attach attribute values to the product
                    $product->attributes()->attach($attribute->id);
                }
            }

            // Create the variants
            foreach ($request['variants'] as $variantData) {
                $variant = Varient::create([
                    'product_id' => $product->id,
                    'price' => $variantData['price'],
                    'quantity' => $variantData['quantity'],
                ]);

                // Attach variant attributes
                foreach ($variantData['attributes'] as $variantAttributeData) {
                    $variant->varientAttributeValues()->attach($variantAttributeData['attribute_id'], [
                        'attribute_value_id' => $variantAttributeData['value_id'],
                    ]);
                }
            }

            return $product;
        });

        return response()->json(['message' => 'Product created successfully!', 'product' => $product], 201);
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
