<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|integer',
            'brand_id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric',
            'description' => 'nullable|string',
            'is_published' => 'nullable|boolean',
            'variants' => 'required|array',
            'variants.*.attributes' => 'required|array',
            'variants.*.attributes.*' => 'required|string',
            'variants.*.variant_values' => 'required|array',
            'variants.*.variant_values.price' => 'required|numeric',
            'variants.*.variant_values.quantity' => 'required|integer',
        ];
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'   => false,
            'message'   => 'Validation errors',
            'errors'      => $validator->errors()
        ], 400));
    }
}
