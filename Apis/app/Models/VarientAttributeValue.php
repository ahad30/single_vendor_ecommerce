<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VarientAttributeValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'varient_attribute_value_id',
        'attribute_value_id'
    ];

    public function varients()
    {
        return $this->hasMany(Varient::class, 'varient_attribute_value_id');
    }
}
