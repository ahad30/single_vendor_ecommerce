<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\AttributeValue;
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
        $data = Product::latest()->with('skus')->paginate();
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

            // Create SKU with attributes from the request
            if (isset($request['skus'])) {
                $this->CreateSkuAttribute($product, $request);
            }

            return $product;
        });

        return Response::created(new ProductResource($product), "Product successfully created");
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
    public function update(UpdateProductRequest $request, Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }


    protected function CreateSkuAttribute($product, $request)
    {
        foreach ($request['skus'] as $skuData) {
            // create sku
            $sku = $product->skus()->create([
                'code' => $this->skuMaker($skuData['attributes'], $product->id),
                'price' => $skuData['price'],
                'quantity' => $skuData['quantity'],
            ]);

            $attributeNames = array_keys($skuData['attributes']);

            // find all attribute values
            $attributeValues = AttributeValue::whereIn('attribute_id', function ($query) use ($attributeNames) {
                $query->select('id')
                    ->from('attributes')
                    ->whereIn('name', $attributeNames);
            })->whereIn('value', array_values($skuData['attributes']))->get(['id', 'attribute_id', 'value']);

            // mapping from attribute name to attribute value
            $attributeValueMap = $attributeValues->groupBy('attribute_id')->mapWithKeys(function ($attributeValues) {
                return [$attributeValues[0]->getAttribute('attribute_id') => $attributeValues->pluck('id', 'value')->toArray()];
            });

            // attach attributevalues to sku
            foreach ($skuData['attributes'] as $attributeName => $attributeValue) {
                if (isset($attributeValueMap[$attributeName][$attributeValue])) {
                    $sku->attributeValues()->attach($attributeValueMap[$attributeName][$attributeValue]);
                }
            }
        }
    }

    protected function SkuMaker(array $data, int $id): string
    {
        $skuAttributes = [];
        // Create the SKU by concatenating attribute values
        foreach ($data as $key => $value) {
            $skuAttributes[] = strtoupper($value);
        }
        // generate the SKU like "SKU3-BLACK-L"
        $sku = "SKU" . $id . "-" . implode('-', $skuAttributes);

        return $sku;
    }
}
