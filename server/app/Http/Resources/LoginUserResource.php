<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginUserResource extends JsonResource
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
            'status' => $this->status,
            $this->mergeWhen($this->is_staff == true, [
                'is_staff' => $this->is_staff,
            ]),
            $this->mergeWhen($this->is_customer == true, [
                'is_customer' => $this->is_customer,
            ]),
        ];
    }
}
