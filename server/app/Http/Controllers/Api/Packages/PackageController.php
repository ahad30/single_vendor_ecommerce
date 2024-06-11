<?php

namespace App\Http\Controllers\Api\Packages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Trait\PaginationTrait;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    use PaginationTrait, UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Package::query()->latest()->with('packageItems');

        $data = $request->get('package_type') === "existing" ? $query->where('is_existing_product_package', true)->paginate() : $query->where('is_existing_product_package', false)->paginate();

        $packages = PackageResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $packages);

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePackageRequest $request)
    {
        $slug = $this->generateSlug($request->name);
        // check if package exists
        if ($slug instanceof \Illuminate\Http\JsonResponse) {
            return $slug; // return the error response
        }

        // Start a database transaction
        $data = DB::transaction(function () use ($request, $slug) {
            $path = $this->uploadImage($request, 'image', 'assets/images/Packages');
            // Create the package with the validated data and generate a slug
            $package = Package::create(array_merge(
                $request->validated(),
                ['slug' => $slug],
                ['image' => $path]
            ));
            // store items
            if ($request->is_existing_product_package == false) {
                $this->storeNewItems($request, $package);
            } else {
                $this->storeExistingItems($request, $package);
            }


            // Return the created package
            return $package;
        });

        // Return a success response with the created package data
        return Response::success($data, "Package successfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Package $package)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        $package->delete();
        return Response::success(null, "Package successfully deleted");
    }

    // generate slug for package
    protected function generateSlug($name)
    {
        $slug = Str::slug($name);

        if (Package::where('slug', $slug)->exists()) {
            return Response::error('Package already exists', 409);
        }

        return $slug;
    }

    // Iterate over the items in the request to create related package items
    protected function storeNewItems($request, $package)
    {
        foreach ($request['items'] as $item) {
            $package->packageItems()->create([
                "product_name" => $item['product_name'],
                "price" => $item['price'],
                "quantity" => $item['quantity'],
            ]);
        }
    }

    protected function storeExistingItems($request, $package)
    {
        foreach ($request['items'] as $item) {
            $package->PackageItems()->create([
                "product_id" => $item['product_id'],
                "product_name" => $item['product_name'],
                "sku_id" => $item['sku_id'],
                "code" => $item['code'],
                "price" => $item['price'],
                "quantity" => $item['quantity']
            ]);
        }
    }
}
