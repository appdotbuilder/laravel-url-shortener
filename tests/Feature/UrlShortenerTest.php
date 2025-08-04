<?php

use App\Models\UrlShortener;

it('displays home page correctly', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('recentUrls')
        );
});

it('can create short url', function () {
    $originalUrl = 'https://example.com/very/long/url/that/needs/to/be/shortened';

    $this->post('/', ['original_url' => $originalUrl])
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('shortUrl')
            ->has('message')
        );

    expect(UrlShortener::where('original_url', $originalUrl)->exists())->toBeTrue();
});

it('returns existing short url for duplicate', function () {
    $originalUrl = 'https://example.com/test';
    
    // Create first URL
    $existingUrl = UrlShortener::create([
        'original_url' => $originalUrl,
        'short_code' => 'test123',
    ]);

    // Try to create the same URL again
    $this->post('/', ['original_url' => $originalUrl])
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('shortUrl')
            ->where('message', 'This URL has already been shortened!')
        );

    // Should only have one record in database
    expect(UrlShortener::where('original_url', $originalUrl)->count())->toBe(1);
});

it('validates url input', function () {
    $this->post('/', ['original_url' => 'not-a-valid-url'])
        ->assertStatus(302)
        ->assertSessionHasErrors(['original_url']);
});

it('requires url input', function () {
    $this->post('/', [])
        ->assertStatus(302)
        ->assertSessionHasErrors(['original_url']);
});

it('can redirect using short code', function () {
    $urlShortener = UrlShortener::create([
        'original_url' => 'https://example.com/test',
        'short_code' => 'abc123',
        'clicks' => 0,
    ]);

    $this->get('/s/abc123')
        ->assertStatus(302)
        ->assertRedirect('https://example.com/test');

    // Check that clicks were incremented
    $urlShortener->refresh();
    expect($urlShortener->clicks)->toBe(1);
});

it('returns 404 for invalid short code', function () {
    $this->get('/s/invalid')->assertStatus(404);
});

it('displays stats page correctly', function () {
    // Create some test data
    UrlShortener::factory(3)->create();

    $this->get('/stats')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('stats')
            ->has('urls')
            ->has('totalUrls')
            ->has('totalClicks')
            ->where('totalUrls', 3)
        );
});

it('generates unique short codes', function () {
    $shortCode1 = UrlShortener::generateUniqueShortCode();
    $shortCode2 = UrlShortener::generateUniqueShortCode();

    expect($shortCode1)->not->toBe($shortCode2);
    expect(strlen($shortCode1))->toBe(6);
    expect(strlen($shortCode2))->toBe(6);
});

it('has working short url accessor', function () {
    $urlShortener = UrlShortener::create([
        'original_url' => 'https://example.com',
        'short_code' => 'test123',
    ]);

    $expectedUrl = url('/s/test123');
    expect($urlShortener->short_url)->toBe($expectedUrl);
});