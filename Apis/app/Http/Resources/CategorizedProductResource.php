<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategorizedProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'is_single_product' => $this->is_single_product == true ? 'Single' : 'Variant',
            'variant_items' => SkuResource::collection($this->whenLoaded('skus')),
        ];
    }
}
