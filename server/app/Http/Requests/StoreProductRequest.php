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
            'brand_id' => 'nullable|integer|exists:brands,id',
            'weight' => 'nullable|string',
            'description' => 'nullable|string',
            'is_published' => 'required|boolean',
            'is_single_product' => 'required|boolean',
            'unit_price' => 'nullable|numeric',
            'unit_quantity' => 'nullable|numeric',
            'skus' => 'nullable|array|min:1',
            'skus.*.sku' => 'nullable|string|max:255|unique:skus,sku',
            'skus.*.attributes' => 'nullable|array',
            'skus.*.quantity' => 'nullable|integer',
            'skus.*.price' => 'nullable|numeric',
            'skus.*.image' => 'nullable|image|mimes:jpeg,png,gif,jpg',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'category_id.required' => 'The category is required.',
            'brand_id.exists' => 'The selected brand is invalid.',
            'is_published.required' => 'The publication status is required.',
            'is_published.boolean' => 'The publication status must be true or false.',
            'is_single_product.required' => 'The product type status is required.',
            'is_single_product.boolean' => 'The product type status must be true or false.',
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
