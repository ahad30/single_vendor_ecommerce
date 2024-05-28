<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Varient extends Model
{
    use HasFactory;

    protected $fillable = ['varient_attribute_value_id', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    // get all varient values
    public function varientValues()
    {
        return $this->hasMany(VarientValue::class, 'varient_id', 'id');
    }

    public function varientAttributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'varient_attribute_values');
    }
}
