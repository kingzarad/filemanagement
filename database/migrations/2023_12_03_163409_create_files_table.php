<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('filesize');
            $table->string('filetype');
            $table->string('download');
            $table->foreignId('users_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('categories_id')->constrained('categories')->cascadeOnDelete();
            $table->string('upload_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
