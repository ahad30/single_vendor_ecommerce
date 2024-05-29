<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\Varient;
use App\Models\VarientValue;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Attributes
        $color = Attribute::create(['name' => 'Color', 'created_by' => 1]);
        $size = Attribute::create(['name' => 'Size', 'created_by' => 1]);

        // Create AttributeValues
        $red = AttributeValue::create(['attribute_id' => $color->id, 'value' => 'Red']);
        $blue = AttributeValue::create(['attribute_id' => $color->id, 'value' => 'Blue']);
        $green = AttributeValue::create(['attribute_id' => $color->id, 'value' => 'Green']);
        $small = AttributeValue::create(['attribute_id' => $size->id, 'value' => 'Small']);
        $large = AttributeValue::create(['attribute_id' => $size->id, 'value' => 'Large']);
        $medium = AttributeValue::create(['attribute_id' => $size->id, 'value' => 'Medium']);

        // Create Products
        $products = [
            [
                'name' => 'T-Shirt',
                'slug' => 't-shirt',
                'product_uid' => 'TSHIRT001',
                'weight' => 200,
                'description' => 'A comfortable cotton T-Shirt',
                'list_type' => 'clothing',
                'is_published' => 1,
                'category_id' => 1,
                'brand_id' => 1,
            ],
            [
                'name' => 'Sweater',
                'slug' => 'sweater',
                'product_uid' => 'SWEATER001',
                'weight' => 300,
                'description' => 'A warm wool sweater',
                'list_type' => 'clothing',
                'is_published' => 1,
                'category_id' => 2,
                'brand_id' => 2,
            ],
            [
                'name' => 'Jeans',
                'slug' => 'jeans',
                'product_uid' => 'JEANS001',
                'weight' => 500,
                'description' => 'A pair of denim jeans',
                'list_type' => 'clothing',
                'is_published' => 1,
                'category_id' => 3,
                'brand_id' => 3,
            ],
        ];

        foreach ($products as $productData) {
            $product = Product::create($productData);

            // Attach Attributes to Product
            $product->attributes()->attach([$color->id, $size->id]);

            // Create Varients
            $varients = [
                [
                    'product_id' => $product->id,
                    'varient_id' => $red->id,
                ],
                [
                    'product_id' => $product->id,
                    'varient_id' => $blue->id,
                ],
                [
                    'product_id' => $product->id,
                    'varient_id' => $green->id,
                ]
            ];

            foreach ($varients as $varientData) {
                $varient = Varient::create($varientData);

                // Attach Varient Attribute Values
                $varient->varientAttributeValues()->attach([$small->id, $medium->id, $large->id]);

                // Create VarientValues
                VarientValue::create([
                    'varient_id' => $varient->id,
                    'price' => rand(999, 2999),
                    'quantity' => rand(10, 100)
                ]);
            }
        }
    }
}
