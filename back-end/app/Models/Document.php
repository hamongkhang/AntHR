<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $table="document";
    protected $fillable = [
        'id',
        'name',
        'name_show',
        'size',
        'folder_id',
        'updated_at',
        'created_at',
    ];
}