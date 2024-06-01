<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\AttributeValue;
use App\Trait\PaginationTrait;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    use PaginationTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::latest()->with('skus')->paginate();
        $products = ProductResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $products);

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
        $product->delete();
        return Response::success(null, 'Product deleted successfully');
    }


    protected function CreateSkuAttribute($product, $request)
    {
        // Create skus
        foreach ($request['skus'] as $skuData) {
            $attributeIds = Attribute::whereIn('name', array_keys($skuData['attributes']))
                ->pluck('id', 'name');
            // Create the SKU
            $sku = $product->skus()->create([
                'code' => $this->SkuMaker($skuData['attributes'], $product->id),
                'price' => $skuData['price'],
                'quantity' => $skuData['quantity'],
            ]);

            // Prepare data for bulk attachment
            $attributesToAttach = [];
            foreach ($skuData['attributes'] as $attributeName => $attributeValue) {
                $attributeId = $attributeIds[$attributeName] ?? null;
                if ($attributeId !== null) {
                    $attributeValueId = AttributeValue::where('attribute_id', $attributeId)
                        ->where('value', $attributeValue)
                        ->value('id');

                    if ($attributeValueId) {
                        $attributesToAttach[] = $attributeValueId;
                    }
                }
            }
        }

        // Attach all attribute values in bulk
        $sku->attributeValues()->attach($attributesToAttach);
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
