<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'product_id',
        'sku_id',
        'product_name',
        'code',
        'price',
        'quantity',
    ];

    // get package
    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id', 'id');
    }
}
