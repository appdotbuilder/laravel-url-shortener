<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUrlShortenerRequest;
use App\Models\UrlShortener;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UrlShortenerController extends Controller
{
    /**
     * Display the URL shortener interface.
     */
    public function index()
    {
        $recentUrls = UrlShortener::latest()->take(5)->get();
        
        return Inertia::render('welcome', [
            'recentUrls' => $recentUrls
        ]);
    }

    /**
     * Store a newly created short URL.
     */
    public function store(StoreUrlShortenerRequest $request)
    {
        // Check if URL already exists
        $existingUrl = UrlShortener::where('original_url', $request->original_url)->first();
        
        if ($existingUrl) {
            $recentUrls = UrlShortener::latest()->take(5)->get();
            
            return Inertia::render('welcome', [
                'recentUrls' => $recentUrls,
                'shortUrl' => $existingUrl,
                'message' => 'This URL has already been shortened!'
            ]);
        }

        // Create new short URL
        $urlShortener = UrlShortener::create([
            'original_url' => $request->original_url,
            'short_code' => UrlShortener::generateUniqueShortCode(),
        ]);

        $recentUrls = UrlShortener::latest()->take(5)->get();

        return Inertia::render('welcome', [
            'recentUrls' => $recentUrls,
            'shortUrl' => $urlShortener,
            'message' => 'URL shortened successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $shortCode)
    {
        $urlShortener = UrlShortener::where('short_code', $shortCode)->firstOrFail();
        
        // Increment click count
        $urlShortener->increment('clicks');
        
        return redirect($urlShortener->original_url);
    }


}