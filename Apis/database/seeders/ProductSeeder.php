<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Attribute;
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

                'varients' => [
                    [
                        'attributes' => [
                            'color',
                            'size',
                        ],
                    ],
                ],

                // 'skus' => [
                //     [
                //         'sku' => 'SKU1-RED-2GB-32GB',
                //         'attributes' => [
                //             'Color' => 'Red',
                //             'RAM' => '2GB',
                //             'Storage' => '32GB',
                //         ],
                //         'quantity' => 10,
                //         'price' => 100,
                //     ],
                //     [
                //         'sku' => 'SKU1-BLUE-4GB-64GB',
                //         'attributes' => [
                //             'Color' => 'Blue',
                //             'RAM' => '4GB',
                //             'Storage' => '64GB',
                //         ],
                //         'quantity' => 5,
                //         'price' => 85,
                //     ],
                // ],
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

                'varients' => [
                    [
                        'attributes' => [
                            'color',
                            'size'
                        ],
                    ],
                ],
                // 'skus' => [
                //     [
                //         'sku' => 'SKU2-GREEN-8GB-128GB',
                //         'attributes' => [
                //             'Color' => 'Green',
                //             'RAM' => '8GB',
                //             'Storage' => '128GB',
                //         ],
                //         'quantity' => 20,
                //         'price' => 200,
                //     ],
                //     [
                //         'sku' => 'SKU2-BLACK-16GB-256GB',
                //         'attributes' => [
                //             'Color' => 'Black',
                //             'RAM' => '16GB',
                //             'Storage' => '256GB',
                //         ],
                //         'quantity' => 15,
                //         'price' => 150,
                //     ],
                // ],
            ],
        ];

        foreach ($products as $productData) {
            DB::transaction(function () use ($productData, $attributes) {
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

                foreach ($productData['varients'] as $varient) {
                    foreach ($varient['attributes'] as $attributeName) {
                        $attributeId = $attributes[$attributeName];

                        $product->attributes()->attach($attributeId);
                    }
                }

                // Create SKUs for the product
                // foreach ($productData['skus'] as $skuData) {
                //     // Create the SKU
                //     $sku = $product->skus()->create([
                //         'code' => $skuData['sku'],
                //         'price' => $skuData['price'],
                //         'quantity' => $skuData['quantity'],
                //     ]);

                //     // Attach attributes to the SKU
                //     foreach ($skuData['attributes'] as $attributeName => $attributeValue) {
                //         $attributeId = $attributes[$attributeName];
                //         $attributeOptionId = AttributeOption::where('attribute_id', $attributeId)
                //             ->where('value', $attributeValue)
                //             ->value('id');

                //         $sku->attributeOptions()->attach($attributeOptionId);
                //     }
                // }
            });
        }
    }
}
