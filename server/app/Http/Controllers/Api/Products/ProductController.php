<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\AttributeValue;
use App\Trait\PaginationTrait;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    use PaginationTrait, UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::latest()->with('skus')->paginate();
        $products = ProductResource::collection($data);

        // Get response with paginated data
        $response = $this->getMetaPagination($data, $products);
        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        DB::transaction(function () use ($request, &$product) {
            $thumbnailPath = $this->uploadImage($request->thumbnail, 'thumbnail', 'assets/images/products/thumbnails');
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
                'thumbnail' => $thumbnailPath,
                'is_single_product' => $request->is_single_product,
            ]);

            // create single products multiple images
            if ($request->images) {
                $this->uploadSingleProductImages($request, $product);
            }

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
        return new ProductResource($product->with('skus')->first());
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

    // create variants for a product
    protected function CreateSkuAttribute($product, $request): void
    {
        // Create skus
        foreach ($request['skus'] as $skuData) {
            $attributeIds = Attribute::whereIn('name', array_keys($skuData['attributes']))
                ->pluck('id', 'name');
            // Create the SKU
            $path = $this->uploadImage($skuData['image'], 'image', 'assets/images/products/sku-images');
            $sku = $product->skus()->create([
                'sku_code' => $this->SkuMaker($skuData['attributes'], $product->id),
                'price' => $skuData['price'],
                'quantity' => $skuData['quantity'],
                "image"  => $path,
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

    // create sku code
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

    // upload multiple image files for single products
    protected function uploadSingleProductImages($request, $product): void
    {
        foreach ($request->images as $image) {
            $path = $this->uploadImage($image, 'image', 'assets/images/products/images');
            $product->images()->create([
                'image' => $path,
            ]);
        }
    }
}
