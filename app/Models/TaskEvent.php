<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskEvent extends Model
{
    protected $table = "task_event";

    protected $fillable = [
        'name',
        'start_time',
        'start_date',
        'end_date'
    ];

    use HasFactory;
}
