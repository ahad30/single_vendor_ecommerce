<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Request;
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
        $data = CategoryResource::collection(Category::latest()->get());
        if($data->count() > 0){
            return Response::success($data);
        }
        return Response::notFound();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $validate = $request->validated();
        $path = $this->uploadImage($request, 'image', 'assets/images/categories');
        $data = Category::create(array_merge($validate,['image' => $path]));
        return Response::created(new CategoryResource($data));
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
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
