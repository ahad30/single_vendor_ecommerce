<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colorAttribute = Attribute::create([
            'id' => 1,
            'name' => 'color',
        ]);

        $sizeAttribute = Attribute::create([
            'id' => 2,
            'name' => 'size',
        ]);

        // color attribute
        AttributeValue::create([
            'id' => 1,
            'attribute_id' => $colorAttribute->id,
            'value' => 'Black',
        ]);
        AttributeValue::create([
            'id' => 2,
            'attribute_id' => $colorAttribute->id,
            'value' => 'Red',
        ]);
        AttributeValue::create([
            'id' => 3,
            'attribute_id' => $colorAttribute->id,
            'value' => 'Blue',
        ]);

        // size attribute
        AttributeValue::create([
            'id' => 4,
            'attribute_id' => $sizeAttribute->id,
            'value' => 'M',
        ]);
        AttributeValue::create([
            'id' => 5,
            'attribute_id' => $sizeAttribute->id,
            'value' => 'L',
        ]);
        AttributeValue::create([
            'id' => 6,
            'attribute_id' => $sizeAttribute->id,
            'value' => 'XL',
        ]);
        AttributeValue::create([
            'id' => 7,
            'attribute_id' => $sizeAttribute->id,
            'value' => 'XXL',
        ]);
    }
}
