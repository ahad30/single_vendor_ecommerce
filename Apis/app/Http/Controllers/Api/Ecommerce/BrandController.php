<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Response;

class BrandController extends Controller
{
    use UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all brands data from the database with pagination enabled
        $data = Brand::latest()->paginate();
        $brand = BrandResource::collection($data);

        // Merge the additional 'status' key with the paginated data
        $response = [
            'status' => true,
            'data' => $brand,
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
    public function store(StoreBrandRequest $request)
    {
        // upload a new image
        $path = $this->uploadImage($request, 'image', 'assets/images/brands');
        // insert data into database
        $data = Brand::create(array_merge($request->validated(), ['image' => $path]));

        // return brand resource with created data
        return Response::created(new BrandResource($data));
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        // update image path
        $path = $request->hasFile('image') ? $this->uploadImage($request, 'image', 'assets/images/brands', $brand->image) : $brand->image;
        // update brand data
        $brand->update(array_merge($request->validated(), ['image' => $path]));

        // return brand resource with updated data
        return Response::updated(new BrandResource($brand), "Brand successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        // check if brand id is 1 then return error message
        if ($brand->id == 1) {
            return Response::error("This brand cannot deleteable");
        }

        // delete brand image
        $this->deleteImage($brand->image);
        // delete brand data from the database
        $brand->delete();

        // return success message
        return Response::success(null, 'Brand successfully deleted');
    }
}
