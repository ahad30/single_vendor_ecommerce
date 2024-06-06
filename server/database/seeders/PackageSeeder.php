<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Package;
use App\Models\PackageItem;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create a package
        Package::create([
            'name' => 'Package 1',
            'slug' => 'package-1',
            'image' => '',
            'description' => 'Package 1 description',
            'price' => 1000,
            'quantity' => 3,
            'created_by' => 1,
            'status' => true,
            'total_orders' => 10,
            'is_existing_product_package' => true,
        ]);

        // creare package Items
        PackageItem::create([
            'package_id' => 1,
            'product_id' => 1,
            'sku_id' => 2,
            'product_name' => 'Product 1',
            'code' => 'SKU1-RED-L',
            'price' => 100,
            'quantity' => 2,
        ]);
        // creare package Items
        PackageItem::create([
            'package_id' => 1,
            'product_id' => 2,
            'sku_id' => 4,
            'product_name' => 'Product 2',
            'code' => 'SKU3-GREEN-XL',
            'price' => 100,
            'quantity' => 3,
        ]);
    }
}
