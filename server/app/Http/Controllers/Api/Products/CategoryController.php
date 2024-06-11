<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Trait\PaginationTrait;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use UploadImageTrait, PaginationTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Category::latest()->paginate();
        $categories = CategoryResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $categories);

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        // store Category Image
        $path = $this->uploadImage($request, 'image', 'assets/images/categories');
        // store data into database
        $data = Category::create(array_merge($request->validated(), ['image' => $path]));

        // return response
        return Response::created(new CategoryResource($data), "Category successfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $inputs = $request->validated();
        if ($path = $this->uploadImage($request, 'image', 'assets/images/categories', $category->image)) {
            $inputs['image'] = $path;
        }

        $category->update($inputs);

        return Response::updated(new CategoryResource($category));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->id == 1) {
            return Response::error("This category cannot deleteable");
        }

        $this->deleteImage($category->image);
        $category->delete();
        return Response::success(null, 'Category deleted successfully');
    }
}
