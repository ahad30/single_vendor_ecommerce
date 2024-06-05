<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'description',
        'price',
        'quantity',
        'created_by',
        'total_orders',
        'status',
    ];

    // get related package items
    public function packageItems()
    {
        return $this->hasMany(PackageItem::class, 'package_id', 'id');
    }
}
