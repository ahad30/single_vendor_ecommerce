<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'brand_id',
        'name',
        'slug',
        'product_uid',
        'weight',
        'description',
        'list_type',
        'unit_price',
        'unit_quantity',
        'is_single_product',
        'is_published',
        'thumbnail',
    ];

    // get category information
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // get brand information
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    // get single product images
    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }

    // get all sku informations
    public function skus()
    {
        return $this->hasMany(Sku::class, 'product_id', 'id');
    }
}
