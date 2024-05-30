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
            'attributes' => 'required|array',
            'attributes.*.name' => 'required|string|max:255',
            'attributes.*.values' => 'required|array',
            'attributes.*.values.*.value' => 'required|string|max:255',
            'variants' => 'required|array',
            'variants.*.price' => 'required|numeric',
            'variants.*.quantity' => 'required|integer',
            'variants.*.attributes' => 'required|array',
            'variants.*.attributes.*.attribute_id' => 'required|integer|exists:attributes,id',
            'variants.*.attributes.*.value_id' => 'required|integer|exists:attribute_values,id',
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
