<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * This method defines the schema for the "tasks" table.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key: auto-incrementing "id" column
            $table->string('title'); // Title of the task
            $table->boolean('completed')->default(false); // Status flag: whether the task is completed
            $table->timestamps(); // Adds "created_at" and "updated_at" columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * This method drops the "tasks" table when rolling back migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
