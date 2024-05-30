<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'attribute_id',
        'value'
    ];

    // get attribute
    public function attribute()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }


    public function skus()
    {
        return $this->belongsToMany(Sku::class, 'attribute_value_skus');
    }
}
