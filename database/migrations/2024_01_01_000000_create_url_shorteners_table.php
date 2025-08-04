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
        Schema::create('url_shorteners', function (Blueprint $table) {
            $table->id();
            $table->string('original_url', 2048)->comment('The original long URL');
            $table->string('short_code', 10)->unique()->comment('The unique short code');
            $table->integer('clicks')->default(0)->comment('Number of times the short URL was accessed');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('short_code');
            $table->index('created_at');
            $table->index(['clicks', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('url_shorteners');
    }
};