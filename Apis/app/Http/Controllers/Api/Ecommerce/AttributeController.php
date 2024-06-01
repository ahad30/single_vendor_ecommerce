<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Trait\PaginationTrait;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AttributeController extends Controller
{
    use PaginationTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Attribute::latest()->with('attributeValues')->paginate();
        $attributes = AttributeResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $attributes);

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
    public function update(UpdateAttributeRequest $request, Attribute $attribute)
    {
        return $request->all();
        $data = DB::transaction(function () use ($attribute, $request) {
            // Update attribute name
            $attribute->update($request->validated());

            // Check and delete old values
            if (!empty($request->value_ids)) {
                $attributeValueIds = $attribute->attributeValues()->pluck('id')->toArray();
                $missingValueIds = array_diff($request->value_ids, $attributeValueIds);

                if (!empty($missingValueIds)) {
                    return Response::notFound("One or more attribute values not found");
                }

                AttributeValue::whereIn('id', $request->value_ids)->delete();
            }

            // Insert new values
            if (!empty($request->values)) {
                $attributeValues = array_map(function ($value) use ($attribute) {
                    return [
                        'attribute_id' => $attribute->id,
                        'value' => $value,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $request->values);

                AttributeValue::insert($attributeValues);
            }

            return $attribute;
        });

        return Response::updated(new AttributeResource($data), "Attribute successfully updated");
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
