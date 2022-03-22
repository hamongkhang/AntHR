<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $table="company";
    protected $fillable = [
        'id',
        'name',
        'domain',
        'size',
        'logo',
        'website',
        'contact_email',
        'contact_phone',
        'over_view',
        'permission',
        'updated_at',
        'created_at',
    ];
}