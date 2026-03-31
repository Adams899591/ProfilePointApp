<?php
 
/**
 * LARAVEL BACKEND SETUP FOR PROFILE POINT
 * 
 * This file contains the Migrations and Factories needed to support the React Native UI.
 * Copy these into your Laravel project files respectively.
 */
 
/*
===========================================================================
1. MIGRATIONS (database/migrations)
===========================================================================

// --- Users Table Migration ---
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('phone')->nullable();
    $table->text('bio')->nullable();
    $table->string('profile_image')->nullable();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});

// --- Tasks Table Migration ---
Schema::create('tasks', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->string('category')->default('General');
    $table->enum('priority', ['Low', 'Medium', 'High'])->default('Medium');
    $table->boolean('completed')->default(false);
    $table->timestamps();
});
*/

/*
===========================================================================
2. FACTORIES (database/factories)
===========================================================================

// --- UserFactory.php ---
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory {
    public function definition(): array {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'bio' => fake()->sentence(10),
            // Using the same professional Unsplash placeholder from our React Native UI
            'profile_image' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}

// --- TaskFactory.php ---
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class TaskFactory extends Factory {
    public function definition(): array {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(4),
            'category' => fake()->randomElement(['UI Design', 'Development', 'Management', 'DevOps', 'Business']),
            'priority' => fake()->randomElement(['Low', 'Medium', 'High']),
            'completed' => fake()->boolean(30), // 30% chance of being completed
        ];
    }
}
*/

/*
===========================================================================
3. SEEDER EXAMPLE (database/seeders/DatabaseSeeder.php)
===========================================================================

// To test your app with real-looking data, you can run this:
public function run(): void {
    // Create 10 users, each with 5 tasks
    User::factory(10)
        ->hasTasks(5)
        ->create();

    // Create a specific user for testing (Usman)
    User::factory()->create([
        'name' => 'Usman Adams',
        'email' => 'usman@example.com',
    ]);
}
*/

?>