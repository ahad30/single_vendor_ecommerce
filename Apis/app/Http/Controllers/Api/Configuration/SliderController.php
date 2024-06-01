<?php

namespace App\Http\Controllers\Api\Configuration;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSliderRequest;
use App\Http\Resources\SliderResource;
use App\Models\Slider;
use App\Trait\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SliderController extends Controller
{
    use PaginationTrait;
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
        return $request->all();
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
    public function update(Request $request, Slider $slider)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider)
    {
        //
    }
}
