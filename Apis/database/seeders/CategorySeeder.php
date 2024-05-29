<?php

namespace Database\Seeders;

use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['id' => '1', 'name' => 'Uncategorized', 'image' => ''],
            ['id' => '2', 'name' => 'Category 1', 'image' => ''],
            ['id' => '3', 'name' => 'Category 2', 'image' => ''],
            ['id' => '4', 'name' => 'Category 3', 'image' => ''],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
