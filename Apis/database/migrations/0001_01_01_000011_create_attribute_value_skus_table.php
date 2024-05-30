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
        Schema::create('attribute_value_skus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sku_id')->constrained('skus')->cascadeOnDelete();
            $table->foreignId('attribute_value_id')->constrained('attribute_values')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_value_skus');
    }
};
