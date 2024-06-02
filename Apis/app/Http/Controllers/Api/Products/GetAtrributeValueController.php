<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetAtrributeValueController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $attributes = AttributeResource::collection(Attribute::orderBy('name')->get());

        return Response::success($attributes);
    }
}
