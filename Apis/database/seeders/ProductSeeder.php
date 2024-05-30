<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = Attribute::pluck('id', 'name')->toArray();
        $attribute_values = AttributeValue::pluck('id', 'name')->toArray();

        $products = [
            [
                'category_id' => 1,
                'brand_id' => 1,
                'name' => 'Product 1',
                'slug' => 'product-1',
                'product_uid' => 'PD-1223',
                'weight' => '.454',
                'description' => 'Product 1 description',
                'is_published' => true,

                'variants' => [
                    [
                        'attributes' => [
                            'color' => 'red',
                            'size' => 'L',
                        ],
                        'variant_values' => [
                            'price' => '100',
                            'quantity' => '10'
                        ],
                    ],
                ],
            ],

            [
                'category_id' => 1,
                'brand_id' => 1,
                'name' => 'Product 2',
                'slug' => 'product-2',
                'product_uid' => 'PD-2223',
                'weight' => '.784',
                'description' => 'Product 2 description',
                'is_published' => true,

                'variants' => [
                    [
                        'attributes' => [
                            'color' => 'blue',
                            'size' => 'M',
                        ],
                        'variant_values' => [
                            'price' => '120',
                            'quantity' => '20'
                        ],
                    ],
                ],
            ],
        ];

        foreach ($products as $productData) {
            DB::transaction(function () use ($productData, $attributes, $attribute_values) {
                // Create the product
                $product = Product::create([
                    'category_id' => $productData['category_id'],
                    'brand_id' => $productData['brand_id'],
                    'name' => $productData['name'],
                    'slug' => $productData['slug'],
                    'product_uid' => $productData['product_uid'],
                    'weight' => $productData['weight'],
                    'description' => $productData['description'],
                    'is_published' => $productData['is_published'],
                ]);

                foreach ($productData['variants'] as $variantData) {
                    // Create the variant
                    $variant = $product->variants()->create([]);

                    // Attach attributes to the variant
                    foreach ($variantData['attributes'] as $attributeName => $attributeValueName) {
                        $attributeId = $attributes[$attributeName];
                        $attributeValueId = $attribute_values[$attributeValueName];

                        $variant->attributes()->attach($attributeId, ['attribute_value_id' => $attributeValueId]);
                    }

                    // Create the variant values
                    $variant->variantValues()->create([
                        'price' => $variantData['variant_values']['price'],
                        'quantity' => $variantData['variant_values']['quantity'],
                    ]);
                }
            });
        }
    }
}
