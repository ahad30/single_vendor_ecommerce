<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Varient extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'varient_attribute_value_id'
    ];

    // varient has many varient properties/values
    public function varientValues()
    {
        return $this->hasMany(VarientValue::class, 'variant_id');
    }

    public function varientAttributeValues()
    {
        return $this->belongsTo(VarientAttributeValue::class, 'varient_attribute_value_id');
    }
}
