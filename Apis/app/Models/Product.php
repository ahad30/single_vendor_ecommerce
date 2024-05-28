<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'product_uid',
        'weight',
        'description',
        'list_type',
        'is_published',
        'category_id',
        'brand_id'
    ];


    // many to many
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_has_attributes');
    }

    // get all varients
    public function varients()
    {
        return $this->hasMany(Varient::class, 'product_id');
    }
}
