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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('product_uid')->unique();
            $table->string('weight')->nullable();
            $table->integer('unit_quantity')->nullable();
            $table->float('unit_price')->nullable();
            $table->text('description')->nullable();
            $table->string('list_type')->default('new-arrival')->comment('top-sales | feature-product');
            $table->boolean('is_single_product')->default(true)->comment('true:single | false:varient');
            $table->boolean('is_published')->default(false);
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
