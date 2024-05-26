<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::create([
            'id' => '1',
            'name' => 'Samsung',
            'image' => '',
        ]);
        Brand::create([
            'id' => '2',
            'name' => 'Apple',
            'image' => '',
        ]);
        Brand::create([
            'id' => '3',
            'name' => 'Nokia',
            'image' => '',
        ]);
    }
}
