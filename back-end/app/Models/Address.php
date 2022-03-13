<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table="address";
    protected $fillable = [
        'id',
        'employee_id',
        'postal_code',
        'city',
        'country',
        'state',
        'updated_at',
        'created_at',
    ];
}