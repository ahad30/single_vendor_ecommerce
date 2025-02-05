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
            'thumbnail' => $this->thumbnail,
            'weight' => $this->weight,
            'list_type' => $this->list_type,
            'is_published' => $this->is_published == true ? 'Published' : 'Unpublished',
            'created_at' => $this->created_at->format('d-m-Y'),
            'is_single_product' => $this->is_single_product == true ? 'Single' : 'Variant',
            $this->mergeWhen($this->is_single_product == true, [
                'price' => $this->unit_price,
                'quantity' => $this->unit_quantity,
                'images' => $this->load('images:id,product_id,image'),
            ]),
            $this->mergeWhen($this->is_single_product == false, [
                'price' => $this->skus->first()->price ?? null,
                'quantity' => $this->skus->sum('quantity'),
                'variants' => [
                    'total_variants' => $this->skus->count()
                ],
                $this->mergeWhen($this->getSkus($request) != null, [
                    'variant_items' => $this->getSkus($request),
                ]),
            ]),
        ];
    }

    public function getSkus($request)
    {
        if ($request->routeIs('product.show')) {
            return SkuResource::collection($this->whenLoaded('skus'));
        }
    }
}
