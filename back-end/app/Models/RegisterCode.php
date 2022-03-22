<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegisterCode extends Model
{
    use HasFactory;
    protected $table="register_code";
    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'name',
        'domain',
        'size',
        'over_view',
        'role',
        'code',
        'updated_at',
        'created_at',
    ];
}