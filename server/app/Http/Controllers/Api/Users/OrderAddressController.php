<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, OrderAddress $orderAddress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderAddress $orderAddress)
    {
        //
    }
}
