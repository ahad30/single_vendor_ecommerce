<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_by' => $this->created_by,
            'values' => $this->attributeValues->map(function ($value) {
                return [
                    'id' => $value->id,
                    'attribute' => $value->attribute->name,
                    'name' => $value->value,
                ];
            }),
        ];
    }
}
