<?php

namespace Database\Factories;

use App\Models\UrlShortener;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UrlShortener>
 */
class UrlShortenerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<UrlShortener>
     */
    protected $model = UrlShortener::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'original_url' => $this->faker->url(),
            'short_code' => $this->faker->unique()->regexify('[A-Za-z0-9]{6}'),
            'clicks' => $this->faker->numberBetween(0, 1000),
        ];
    }
}