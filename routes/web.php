<?php

use App\Http\Controllers\StatsController;
use App\Http\Controllers\UrlShortenerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// URL Shortener routes
Route::get('/', [UrlShortenerController::class, 'index'])->name('home');
Route::post('/', [UrlShortenerController::class, 'store'])->name('url.store');
Route::get('/s/{shortCode}', [UrlShortenerController::class, 'show'])->name('url.redirect');
Route::get('/stats', [StatsController::class, 'index'])->name('url.stats');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
