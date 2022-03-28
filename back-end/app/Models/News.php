<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class News extends Model
{
    use HasFactory;
    protected $table="news";
    protected $fillable = [
        'id',
        'title',
        'content',
        'file',
        'important',
        'created_at',
        'updated_at',
    ];
}
