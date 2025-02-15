<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'image' => $this->image,
            'is_active' => $this->is_active,
            'is_customer' => $this->is_customer,
            $this->mergeWhen(auth()->user()->is_staff == true, [
                'is_staff' => $this->is_staff,
                'is_administration' => $this->is_administration,
                'role' => $this->getRoleNames()
            ]),
        ];
    }
}
