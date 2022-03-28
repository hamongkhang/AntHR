<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    protected $table="code";
    protected $fillable = [
        'id',
        'employee_id',
        'code',
        'updated_at',
        'created_at',
    ];
}