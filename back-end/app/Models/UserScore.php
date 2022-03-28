<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class UserScore extends Model
{
    use HasFactory;
    protected $table="user_score";
    protected $fillable = [
        'id',
        'user_id',
        'score',
        'score_spent',
        'gift',
        'created_at',
        'updated_at',
    ];
}
