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
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'brand_id' => 'required|integer|exists:brands,id',
            'weight' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_published' => 'required|boolean',
            'skus' => 'nullable|array|min:1',
            'skus.*.sku' => 'nullable|string|max:255|unique:skus,sku',
            'skus.*.attributes' => 'nullable|array',
            'skus.*.attributes.Color' => 'nullable|string|max:50',
            'skus.*.attributes.Size' => 'nullable|string|max:50',
            'skus.*.quantity' => 'nullable|integer|min:0',
            'skus.*.price' => 'nullable|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'category_id.required' => 'The category is required.',
            'category_id.exists' => 'The selected category is invalid.',
            'brand_id.required' => 'The brand is required.',
            'brand_id.exists' => 'The selected brand is invalid.',
            'weight.required' => 'The product weight is required.',
            'weight.numeric' => 'The product weight must be a number.',
            'is_published.required' => 'The publication status is required.',
            'is_published.boolean' => 'The publication status must be true or false.',
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
