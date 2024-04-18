<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $table = "position";
    protected $fillable = [
        'name'
    ];
    use HasFactory;

    public function employees()
    {
        return $this->hasMany(Employee::class, 'position_id', 'id');
    }
}
