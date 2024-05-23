<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'product_uid',
        'weight',
        'description',
        'list_type',
        'is_published',
        'category_id',
        'brand_id'
    ];

    // many to many
    public function productAttributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_has_attributes');
    }
}
