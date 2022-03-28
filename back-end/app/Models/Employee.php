<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class Employee extends Model
{
    use HasFactory;
    protected $table="employee";
    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'user_id',
        'avatar',
        'email',
        'phone',
        'birthday',
        'gender',
        'created_at',
        'updated_at',
    ];
}
