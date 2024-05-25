<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Category::paginate();
        $categories = CategoryResource::collection($data);

        // Merge the additional 'status' key with the paginated data
        $response = [
            'status' => true,
            'categories' => $categories,
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
    public function store(StoreCategoryRequest $request)
    {
        $path = $this->uploadImage($request, 'image', 'assets/images/categories');

        $data = Category::create(array_merge($request->validated(), ['image' => $path]));

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
        $validated = $request->validated();
        $path = $this->uploadImage($request, 'image', 'assets/images/categories', $category->image);
        $data = array_merge($validated, ['image' => $path ?: $category->image]);
        $category->update($data);
        return Response::updated(new CategoryResource($category));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->deleteImage($category->image);
        $category->delete();
        return Response::success(null, 'Category deleted successfully');
    }
}
