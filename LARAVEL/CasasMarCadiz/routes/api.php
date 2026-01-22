<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VendedorController;

//Todas las rutas de la api llevan el prefijo /api delante
//Route::get('/novedades', [CompradorController::class, 'cargarNovedades']);

Route::apiResource('vendedor', VendedorController::class);
