<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class Praise extends Model
{
    use HasFactory;
    protected $table="praise";
    protected $fillable = [
        'id',
        'author',
        'image',
        'message',
        'score',
        'present',
        'recipient',
        'cheer',
        'status',
        'created_at',
        'updated_at',
    ];
}
