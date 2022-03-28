<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $table="attendances";
    protected $fillable = [
        'id',
        'user_id',
        'name',
        'clock_in',
        'clock_out',
        'work_schedule',
        'logged_time',
        'deficit',
        'status',
        'note',
        'created_at',
        'updated_at',
    ];
}
