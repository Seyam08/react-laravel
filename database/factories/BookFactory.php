<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(5),
            'price' => fake()->randomFloat(3, 10, 999),
            'user_id' => User::where('role', Role::Author)->inRandomOrder()->first()->id ?? User::factory()->create(['role' => Role::Author])->id,
        ];
    }
}
