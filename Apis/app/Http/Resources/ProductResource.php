<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'slug' => $this->slug,
            'product_uid' => $this->product_uid,
            'category' => $this->category->name,
            'brand' => $this->brand->name,
            'image' => $this->image,
            'weight' => $this->weight,
            'list_type' => $this->list_type,
            'created_at' => $this->created_at->format('d-m-Y'),
            'skus' => $this->skus,
        ];
    }
}
