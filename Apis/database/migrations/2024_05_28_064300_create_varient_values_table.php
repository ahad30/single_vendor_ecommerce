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
        Schema::create('varient_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('varient_id');
            $table->float('price')->nullable();
            $table->integer('quantity')->nullable();
            $table->foreign('varient_id')->references('id')->on('varients')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('varient_values');
    }
};
