<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    protected $fillable = [
        'filename',
        'filesize',
        'filetype',
        'download',
        'users_id',
        'categories_id',
        'upload_name',
    ];
    use HasFactory;
}
