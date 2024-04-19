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
        Schema::create('task_event', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->time('start_time');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('place');
            $table->unsignedBigInteger('position_id');
            $table->foreign('position_id')->references('id')->on('position')->onDelete('cascade');
            $table->tinyInteger('status')->default(0)->comment('0=notsent, 1=sent');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_event');
    }
};
