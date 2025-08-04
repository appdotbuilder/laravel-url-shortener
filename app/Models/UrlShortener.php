<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UrlShortener
 *
 * @property int $id
 * @property string $original_url
 * @property string $short_code
 * @property int $clicks
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener query()
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener whereClicks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener whereOriginalUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener whereShortCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UrlShortener whereUpdatedAt($value)
 * @method static \Database\Factories\UrlShortenerFactory factory($count = null, $state = [])
 * @method static UrlShortener create(array $attributes = [])
 * @method static UrlShortener firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class UrlShortener extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'original_url',
        'short_code',
        'clicks',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'clicks' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Generate a unique short code.
     *
     * @return string
     */
    public static function generateUniqueShortCode(): string
    {
        do {
            $shortCode = self::generateShortCode();
        } while (self::where('short_code', $shortCode)->exists());

        return $shortCode;
    }

    /**
     * Generate a random short code.
     *
     * @return string
     */
    protected static function generateShortCode(): string
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $length = 6;
        $shortCode = '';

        for ($i = 0; $i < $length; $i++) {
            $shortCode .= $characters[random_int(0, strlen($characters) - 1)];
        }

        return $shortCode;
    }

    /**
     * Get the full short URL.
     *
     * @return string
     */
    public function getShortUrlAttribute(): string
    {
        return url('/s/' . $this->short_code);
    }
}