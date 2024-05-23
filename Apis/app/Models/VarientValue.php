<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VarientValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'varient_id',
        'price',
        'quantity',
    ];

    // varient properties/values belong to a single variant
    public function varient()
    {
        return $this->belongsTo(Varient::class, 'varient_id');
    }
}
