<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'address',
        'is_default',
    ];

    // get user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
