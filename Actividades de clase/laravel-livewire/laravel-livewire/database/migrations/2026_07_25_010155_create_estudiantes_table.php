<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('carnet', 15)->unique();
            $table->string('nombre', 100);
            $table->string('apellidos', 100);
            $table->string('correo')->unique();
            $table->foreignID('carrera_id')->constrained('carreras')->cascadeOnDelete();
            $table->boolean('activo')->default(true);
            $table->timestamps();

            $table->index(['nombre', 'apellidos']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Estudiante', function (Blueprint $table) {
            //
        });
    }
};
