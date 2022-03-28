<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class Present extends Model
{
    use HasFactory;
    protected $table="present";
    protected $fillable = [
        'id',
        'category_id',
        'name',
        'image',
        'price',
        'author',
        'description',
        'score',
        'status',
        'created_at',
        'updated_at',
    ];
}
