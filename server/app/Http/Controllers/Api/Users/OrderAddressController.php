<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderAddressRequest;
use App\Http\Resources\OrderAddressResource;
use App\Models\OrderAddress;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = OrderAddressResource::collection($request->user()->orderAddresses);

        return Response::success($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderAddressRequest $request)
    {
        $userId = $request->user()->id;

        // Check if the user already has 5 addresses
        if (OrderAddress::where('user_id', $userId)->count() >= 5) {
            return Response::error("You can't add more than 5 addresses");
        }

        if (OrderAddress::where('user_id', $userId)->count() <= 0) {
            $input['is_default'] = true;
        }

        $input = $request->validated();
        $input['user_id'] = $userId;
        $data = OrderAddress::create($input);

        return Response::success(new OrderAddressResource($data), "Address successfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderAddress $orderAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOrderAddressRequest $request, OrderAddress $orderAddress)
    {
        return $orderAddress;
        $userId = $request->user()->id;

        // Check if the user already has 5 addresses
        if (!$orderAddress->user_id == $userId) {
            return Response::error("You are not allowed to edit this address");
        }

        $input = $request->validated();
        $input['user_id'] = $userId;
        $orderAddress->update($input);

        return Response::success(new OrderAddressResource($orderAddress), "Address successfully created");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderAddress $orderAddress)
    {
        //
    }
}
