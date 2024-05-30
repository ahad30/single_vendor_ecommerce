<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
        $productId = $this->route('product'); // Assuming the route parameter is named 'product'

        return [
            'name' => 'required|string|max:255',
            'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($productId)],
            'category_id' => 'required|integer|exists:categories,id',
            'brand_id' => 'required|integer|exists:brands,id',
            'product_uid' => ['required', 'string', 'max:255', Rule::unique('products', 'product_uid')->ignore($productId)],
            'weight' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_published' => 'required|boolean',
            'skus' => 'required|array|min:1',
            'skus.*.sku' => ['required', 'string', 'max:255', Rule::unique('skus', 'sku')->ignore($productId, 'product_id')],
            'skus.*.attributes' => 'required|array',
            'skus.*.attributes.Color' => 'required|string|max:50',
            'skus.*.attributes.Size' => 'required|string|max:50',
            'skus.*.quantity' => 'required|integer|min:0',
            'skus.*.price' => 'required|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'slug.required' => 'The product slug is required.',
            'slug.unique' => 'The product slug must be unique.',
            'category_id.required' => 'The category ID is required.',
            'category_id.exists' => 'The selected category ID is invalid.',
            'brand_id.required' => 'The brand ID is required.',
            'brand_id.exists' => 'The selected brand ID is invalid.',
            'product_uid.required' => 'The product UID is required.',
            'product_uid.unique' => 'The product UID must be unique.',
            'weight.required' => 'The product weight is required.',
            'weight.numeric' => 'The product weight must be a number.',
            'is_published.required' => 'The publication status is required.',
            'is_published.boolean' => 'The publication status must be true or false.',
            'skus.required' => 'At least one SKU is required.',
            'skus.*.sku.required' => 'The SKU code is required.',
            'skus.*.sku.unique' => 'The SKU code must be unique.',
            'skus.*.attributes.required' => 'The SKU attributes are required.',
            'skus.*.attributes.Color.required' => 'The color attribute is required.',
            'skus.*.attributes.Size.required' => 'The size attribute is required.',
            'skus.*.quantity.required' => 'The SKU quantity is required.',
            'skus.*.quantity.integer' => 'The SKU quantity must be an integer.',
            'skus.*.price.required' => 'The SKU price is required.',
            'skus.*.price.numeric' => 'The SKU price must be a number.',
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
