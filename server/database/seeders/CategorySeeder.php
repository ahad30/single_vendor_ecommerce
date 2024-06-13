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
        $categories = [];

        for ($i = 1; $i <= 100; $i++) {
            $categories[] = [
                'id' => $i,
                'name' => 'Category ' . $i,
                'image' => 'image' . $i . '.png', // You can modify this if you have specific image naming
            ];
        }

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
