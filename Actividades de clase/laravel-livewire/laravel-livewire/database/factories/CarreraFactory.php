<?php

namespace Database\Factories;

use App\Models\Carrera;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Carrera>
 */
class CarreraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->unique()->randomElement(['Ingenieria en software', 'Ingles', 'Contabilidad', 'Recursos Humanos', 'Comercio']),
            'codigo' => $this->faker->unique()->numerify('INF-###'),
            'activo' => $this->faker->boolean(90),

        ];
    }
}
