<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Attribute::with('attributeValues')->paginate();
        $attributes = AttributeResource::collection($data);

        // Merge the additional 'status' key with the paginated data
        $response = [
            'status' => true,
            'data' => $attributes,
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
    public function store(CreateAttributeRequest $request)
    {
        $data = DB::transaction(function () use ($request) {
            $data = Attribute::create($request->validated());

            $attributeValues = array_map(function ($value) use ($data) {
                return [
                    'attribute_id' => $data->id,
                    'value' => $value,
                    'created_at' => now()
                ];
            }, $request->values);

            AttributeValue::insert($attributeValues);

            return $data;
        });

        return Response::created($data, "Attribute successfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribute $attribute)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        if (!empty($attribute)) {
            $attribute->delete();
            return Response::success(null, 'Attribute successfully deleted');
        }

        return Response::notFound("Attribute not found");
    }
}
