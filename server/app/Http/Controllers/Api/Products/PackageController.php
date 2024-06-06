<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Trait\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    use PaginationTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Package::latest()->with('packageItems')->paginate();
        $packages = PackageResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $packages);

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */

    // generate slug for package
    protected function generateSlug($name)
    {
        $slug = Str::slug($name);

        if (Package::where('slug', $slug)->exists()) {
            return Response::error('Package already exists', 409);
        }

        return $slug;
    }
    // check if package exists
    public function checkPackageExists($package)
    {
    }

    public function store(StorePackageRequest $request)
    {
        $slug = $this->generateSlug($request->name);
        if ($slug instanceof \Illuminate\Http\JsonResponse) {
            return $slug; // return the error response
        }

        // Start a database transaction
        $data = DB::transaction(function () use ($request, $slug) {
            // Create the package with the validated data and generate a slug
            $package = Package::create(array_merge($request->validated(), ['slug' => $slug]));
            // store items
            $this->storeItems($request, $package);

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
        // check if the user is staff or customer
        // if ($customer->is_staff == true) {
        //     return Response::error("Sorry, you are trying to delete a staff");
        // }

        // delete the customer
        // $customer->delete();
        // return Response::success(null, "Customer successfully deleted");
    }

    // Iterate over the items in the request to create related package items
    protected function storeItems($request, $package)
    {
        foreach ($request['items'] as $item) {
            $package->packageItems()->create([
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
