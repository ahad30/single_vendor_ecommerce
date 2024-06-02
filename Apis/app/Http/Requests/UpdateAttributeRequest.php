<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateAttributeRequest extends FormRequest
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
        $id = $this->route('attribute');
        return [
            'name' => [
                'required',
                'string',
                Rule::unique('attributes')->ignore($id),
                'max:255'
            ],
            'values' => 'nullable|array',
            'values.*' => [
                'string',
                Rule::unique('attribute_values', 'value')->where(function ($query) use ($id) {
                    $query->where('attribute_id', '!=', $id);
                }),
                'max:255'
            ],
            'value_ids' => 'nullable|array',
            'value_ids.*' => ['string'],
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
