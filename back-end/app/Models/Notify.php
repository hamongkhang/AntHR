<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notify extends Model
{
    use HasFactory;
    protected $table="notify";
    protected $fillable = [
        'id',
        'user_id',
        'category',
        'title',
        'content',
        'status',
        'updated_at',
        'created_at',
    ];
}