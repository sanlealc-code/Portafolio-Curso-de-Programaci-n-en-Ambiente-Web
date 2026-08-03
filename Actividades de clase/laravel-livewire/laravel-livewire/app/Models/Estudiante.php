<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Estudiante extends Model
{
    /** @use HasFactory<\Database\Factories\EstudianteFactory> */
    use HasFactory;
    protected $fillable = [
        'carnet',
        'nombre',
        'apellidos',
        'correo',
        'carrera_id',
        'activo',
    ];
    protected function casts(): array
    {
        return [
            'activo' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
    public function carrera(): BelongsTo
    {
        return $this->belongsTo(Carrera::class);
    }
}
