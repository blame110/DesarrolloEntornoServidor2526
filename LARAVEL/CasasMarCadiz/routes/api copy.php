<?php

use App\Http\Controllers\Api\VendedorController;
use Illuminate\Support\Facades\Route;

// Todas las rutas aquí tendrán el prefijo /api automáticamente
// Ejemplo: /api/vendedores

Route::get('/vendedores', [VendedorController::class, 'index']);        // Listar
Route::get('/vendedores/{id}', [VendedorController::class, 'show']);    // Ver uno
Route::post('/vendedores', [VendedorController::class, 'store']);       // Crear
Route::put('/vendedores/{id}', [VendedorController::class, 'update']);  // Actualizar
Route::delete('/vendedores/{id}', [VendedorController::class, 'destroy']); // Eliminar

// O con resource (genera las mismas rutas):
// Route::apiResource('vendedores', VendedorController::class);