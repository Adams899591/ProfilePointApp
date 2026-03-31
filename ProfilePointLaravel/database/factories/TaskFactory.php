<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(4),
            'category' => fake()->randomElement(['UI Design', 'Development', 'Management', 'DevOps', 'Business']),
            'priority' => fake()->randomElement(['Low', 'Medium', 'High']),
            'completed' => fake()->boolean(30), // 30% chance of being completed
        ];
    }
}
