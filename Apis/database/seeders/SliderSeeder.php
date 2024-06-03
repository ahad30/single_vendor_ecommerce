<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Slider::create([
            'name' => 'Slider 1',
            'image' => '',
            'status' => true,
        ]);

        Slider::create([
            'name' => 'Slider 2',
            'image' => '',
            'status' => false,
        ]);
    }
}
