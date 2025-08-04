<?php

namespace Database\Seeders;

use App\Models\UrlShortener;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UrlShortenerSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample shortened URLs
        UrlShortener::create([
            'original_url' => 'https://github.com/laravel/laravel',
            'short_code' => 'github',
            'clicks' => 42,
        ]);

        UrlShortener::create([
            'original_url' => 'https://laravel.com/docs',
            'short_code' => 'docs',
            'clicks' => 78,
        ]);

        UrlShortener::create([
            'original_url' => 'https://tailwindcss.com',
            'short_code' => 'tw',
            'clicks' => 23,
        ]);

        UrlShortener::create([
            'original_url' => 'https://inertiajs.com',
            'short_code' => 'inertia',
            'clicks' => 15,
        ]);

        UrlShortener::create([
            'original_url' => 'https://reactjs.org',
            'short_code' => 'react',
            'clicks' => 56,
        ]);

        // Create additional random URLs using factory
        UrlShortener::factory(10)->create();
    }
}