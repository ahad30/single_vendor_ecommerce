<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'gender' => $this->gender,
            'dob' => $this->dob,
            'image' => $this->image,
            $this->mergeWhen($this->is_staff == true, [
                'role' => RoleResource::collection($this->roles->load('permissions')),
            ]),
            $this->mergeWhen($this->is_customer == true, [
                'role' => 'customer',
            ]),
        ];
    }
}
