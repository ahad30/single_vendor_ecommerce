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
        // generate slug
        $slug = $this->generateSlug($request->name);
        // check if Product exists
        if ($slug instanceof \Illuminate\Http\JsonResponse) {
            return $slug;
        }

        DB::transaction(function () use ($request, $slug, &$product) {
            // upload thumbnail
            $thumbnailPath = $this->uploadImage($request, 'thumbnail', 'assets/images/products/thumbnails');
            // Create the product
            $product = Product::create([
                'name' => $request['name'],
                'slug' => $slug,
                'product_uid' => uniqid('PRD-'),
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
                'description' => $request->description,
                'is_published' => $request->is_published,
                'list_type' => $request->list_type,
                'weight' => $request->weight,
                'is_single_product' => $request->is_single_product,
                'thumbnail' => $thumbnailPath,
                'unit_price' => $request->unit_price,
                'unit_quantity' => $request->unit_quantity,
            ]);

            // create single products multiple images
            if ($request->hasFile('images')) {
                foreach ($request->images as $image) {
                    $this->uploadSingleProductImages($image, $product);
                }
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

    // generate slug for package
    protected function generateSlug($name)
    {
        $slug = Str::slug($name);

        if (Product::where('slug', $slug)->exists()) {
            return Response::error('Product already exists', 409);
        }

        return $slug;
    }

    // create variants for a product
    protected function CreateSkuAttribute($product, $request)
    {
        // Create skus
        foreach ($request['skus'] as $skuData) {
            $attributeIds = Attribute::whereIn('name', array_keys($skuData['attributes']))
                ->pluck('id', 'name');
            // Create the SKU
            $sku = $this->SkuMaker($skuData['attributes'], $product->id);
            $path = $this->uploadSkuImage($skuData['image']);
            $sku = $product->skus()->create([
                'sku_code' => $sku,
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

            // Attach all attribute values in bulk
            $sku->attributeValues()->attach($attributesToAttach);
        }
    }

    // create sku code
    protected function SkuMaker(array $data, $id): string
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
    protected function uploadSingleProductImages($image, $product)
    {
        $directory = "assets/images/products/images";
        $extension = $image->getClientOriginalExtension();
        $fileName = Str::uuid() . '.' . $extension;
        $image->move(public_path($directory), $fileName);
        $path = $directory . '/' . $fileName;

        $product->images()->create([
            'image' => $path,
        ]);
    }

    // upload sku image
    protected function uploadSkuImage($image)
    {
        $directory = "assets/images/products/sku-images";
        $extension = $image->getClientOriginalExtension();
        $fileName = Str::uuid() . '.' . $extension;
        $image->move(public_path($directory), $fileName);
        return $directory . '/' . $fileName;
    }
}
