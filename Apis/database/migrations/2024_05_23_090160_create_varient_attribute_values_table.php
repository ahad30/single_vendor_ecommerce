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
        Schema::create('varient_attribute_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('varient_attribute_value_id');
            $table->unsignedBigInteger('attribute_value_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('varient_attribute_values');
    }
};
