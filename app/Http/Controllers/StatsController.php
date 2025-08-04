<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UrlShortener;
use Inertia\Inertia;

class StatsController extends Controller
{
    /**
     * Display statistics for all URLs.
     */
    public function index()
    {
        $urls = UrlShortener::orderBy('clicks', 'desc')->paginate(10);
        $totalUrls = UrlShortener::count();
        $totalClicks = UrlShortener::sum('clicks');
        
        return Inertia::render('stats', [
            'urls' => $urls,
            'totalUrls' => $totalUrls,
            'totalClicks' => $totalClicks
        ]);
    }
}