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
        $attributesMapping = Attribute::pluck('id', 'name')->toArray();

        $productsConfig = [
            // varient product
            [
                'name' => 'Product 1',
                'slug' => 'product-1',
                'category_id' => 1,
                'brand_id' => 1,
                'product_uid' => uniqid("PRD-"),
                'weight' => '.5kg',
                'description' => 'Product 1 Description',
                'is_published' => true,
                'unit_price' => 0,
                'unit_quantity' => 0,
                'is_single_product' => false,
                'list_type' => 'new-arrival',
                'skus' => [
                    [
                        'sku' => 'SKU1-RED-2GB-32GB',
                        'attributes' => [
                            'Color' => 'Red',
                            'Size' => 'M',
                        ],
                        'quantity' => 10,
                        'price' => 100,
                    ],
                    [
                        'sku' => 'SKU1-BLUE-4GB-64GB',
                        'attributes' => [
                            'Color' => 'Blue',
                            'Size' => 'XL',
                        ],
                        'quantity' => 5,
                        'price' => 85,
                    ],
                ],
            ],
            // varient product
            [
                'name' => 'Product 2',
                'slug' => 'product-2',
                'category_id' => 1,
                'brand_id' => 1,
                'product_uid' => uniqid("PRD-"),
                'weight' => '.3kg',
                'description' => 'Product 2 Description',
                'list_type' => 'top-sale',
                'is_published' => true,
                'unit_price' => 0,
                'unit_quantity' => 0,
                'is_single_product' => false,
                'skus' => [
                    [
                        'sku' => 'SKU2-GREEN-8GB-128GB',
                        'attributes' => [
                            'Color' => 'Black',
                            'Size' => 'L',
                        ],
                        'quantity' => 20,
                        'price' => 200,
                    ],
                    [
                        'sku' => 'SKU2-BLACK-16GB-256GB',
                        'attributes' => [
                            'Color' => 'Red',
                            'Size' => 'XXL',
                        ],
                        'quantity' => 15,
                        'price' => 150,
                    ],
                ],
            ],
            // single product
            [
                'name' => 'Product 3',
                'slug' => 'product-3',
                'category_id' => 1,
                'brand_id' => 1,
                'product_uid' => uniqid("PRD-"),
                'weight' => '1.5kg',
                'description' => 'Product 3 Description',
                'list_type' => 'feature-product',
                'is_published' => true,
                'unit_price' => 500,
                'unit_quantity' => 10,
                'is_single_product' => true,
            ],
        ];

        foreach ($productsConfig as $productData) {
            DB::transaction(function () use ($productData, $attributesMapping) {
                // Create the product
                $product = Product::create([
                    'name' => $productData['name'],
                    'slug' => $productData['slug'],
                    'category_id' => $productData['category_id'],
                    'brand_id' => $productData['brand_id'],
                    'product_uid' => $productData['product_uid'],
                    'weight' => $productData['weight'],
                    'description' => $productData['description'],
                    'is_published' => $productData['is_published'],
                    'list_type' => $productData['list_type'],
                    'unit_price' => $productData['unit_price'],
                    'unit_quantity' => $productData['unit_quantity'],
                    'is_single_product' => $productData['is_single_product'],
                ]);

                // Create SKUs for the product
                if (!empty($productData['skus'])) {
                    foreach ($productData['skus'] as $skuData) {
                        // Create the SKU
                        $sku = $product->skus()->create([
                            'code' => $skuData['sku'],
                            'price' => $skuData['price'],
                            'quantity' => $skuData['quantity'],
                        ]);

                        // Attach attributes to the SKU
                        foreach ($skuData['attributes'] as $attributeName => $attributeValue) {
                            $attributeId = $attributesMapping[$attributeName];
                            $attributeValueId = AttributeValue::where('attribute_id', $attributeId)
                                ->where('value', $attributeValue)
                                ->value('id');

                            $sku->attributeValues()->attach($attributeValueId);
                        }
                    }
                }
            });
        }
    }
}
