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
        $path = $this->uploadImage($request, 'image', 'assets/images/brands');

        $data = Brand::create(array_merge($request->validated(), ['image' => $path]));

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
        $validated = $request->validated();
        $path = $this->uploadImage($request, 'image', 'assets/images/brands', $brand->image);
        $data = array_merge($validated, [$path ? ['image' => $path] : $brand->image]);
        $brand->update($data);
        return Response::updated(new BrandResource($brand), "Brand successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        if ($brand->id == 1) {
            return Response::error("This brand cannot deleteable");
        }

        $this->deleteImage($brand->image);
        $brand->delete();
        return Response::success(null, 'Brand successfully deleted');
    }
}
