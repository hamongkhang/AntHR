<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;
    protected $table="bank";
    protected $fillable = [
        'id',
        'employee_id',
        'user_name',
        'name',
        'user_number',
        'updated_at',
        'created_at',
    ];
}