<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentFolder extends Model
{
    use HasFactory;
    protected $table="document_folder";
    protected $fillable = [
        'id',
        'name',
        'description',
        'share',
        'sum',
        'author',
        'updated_at',
        'created_at',
    ];
}