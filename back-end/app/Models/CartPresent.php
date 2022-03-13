<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartPresent extends Model
{
    use HasFactory;
    protected $table="cart_present";
    protected $fillable = [
        'id',
        'user_id',
        'present_id',
        'status',
        'updated_at',
        'created_at',
    ];
}