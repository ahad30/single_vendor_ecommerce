<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Trait\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
    public function store(Request $request)
    {
        //
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
}
