<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'created_by',
    ];

    // get all attribute values
    public function attributeValues()
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id');
    }

    // hasmany product hasmany attribute (get products)
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_has_attributes');
    }
}
