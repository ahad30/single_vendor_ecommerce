<?php

namespace App\Http\Controllers\Api\Configuration;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSliderRequest;
use App\Http\Requests\UpdateSliderRequest;
use App\Http\Resources\SliderResource;
use App\Models\Slider;
use App\Trait\PaginationTrait;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Response;

class SliderController extends Controller
{
    use PaginationTrait, UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all sliders data from the database with pagination enabled
        $data = Slider::latest()->paginate();
        $sliders = SliderResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $sliders);

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSliderRequest $request)
    {
        // upload image
        $path = $this->uploadImage($request, 'image', 'assets/images/sliders');
        // store slider data into the database
        $data = Slider::create(array_merge($request->validated(), ['image' => $path]));

        // return response with created data and message
        return Response::created(new SliderResource($data), "Slider successfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Slider $slider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSliderRequest $request, Slider $slider)
    {
        // check atlest two sliders are active
        if ($request['status'] == false) {
            if (!Slider::where('status', true)->count() <= 2) {
                return Response::error("You cannot update last two slider status");
            }
        }

        // update slider
        $inputs = $request->validated();
        if ($path = $this->uploadImage($request, 'image', 'assets/images/sliders', $slider->image)) {
            $inputs['image'] = $path;
        }
        $slider->update($inputs);

        // return response with updated data and message
        return Response::updated(new SliderResource($slider), "Slider successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider)
    {
        if (!Slider::count() <= 2) {
            return Response::error("You cannot delete last two slider");
        }

        // delete image
        $this->deleteImage($slider->image);
        // delete slider from database
        $slider->delete();

        // return response
        return Response::success(null, 'Slider deleted successfully');
    }
}
