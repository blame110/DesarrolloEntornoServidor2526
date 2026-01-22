<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vendedor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VendedorController extends Controller
{
    /**
     * Listar vendedores con paginación
     * GET /api/vendedores
     * GET /api/vendedores?page=2
     * GET /api/vendedores?per_page=20
     */
    public function index(Request $request): JsonResponse
    {
        // Número de elementos por página (por defecto 10)
        $perPage = $request->input('per_page', 10);

        $vendedores = Vendedor::orderBy('nombre')
            ->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $vendedores
        ]);
    }

    /**
     * Ver un vendedor
     * GET /api/vendedores/{id}
     */
    public function show(Vendedor $vendedor): JsonResponse
    {
        //$vendedor = Vendedor::find($id);

        if (!$vendedor) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vendedor no encontrado'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $vendedor
        ]);
    }

    /**
     * Crear vendedor
     * POST /api/vendedores
     */
    public function store(Request $request): JsonResponse
    {
        // Validación
        $validator = validator($request->all(), [
            'nombre' => 'required|max:100',
            'nif' => 'required|max:9|unique:vendedor,nif',
            'fecha_nac' => 'required|date',
            'sexo' => 'required|in:M,F,O',
            'sueldo_base' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $vendedor = Vendedor::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Vendedor creado correctamente',
            'data' => $vendedor
        ], 201);
    }

    /**
     * Actualizar vendedor
     * PUT /api/vendedores/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $vendedor = Vendedor::find($id);

        if (!$vendedor) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vendedor no encontrado'
            ], 404);
        }

        // Validación (el NIF puede ser el mismo del vendedor actual)
        $validator = validator($request->all(), [
            'nombre' => 'required|max:100',
            'nif' => 'required|max:9|unique:vendedor,nif,' . $id,
            'fecha_nac' => 'required|date',
            'sexo' => 'required|in:M,F,O',
            'sueldo_base' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $vendedor->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Vendedor actualizado correctamente',
            'data' => $vendedor
        ]);
    }

    /**
     * Eliminar vendedor
     * DELETE /api/vendedores/{id}
     */
    public function destroy($id): JsonResponse
    {
        $vendedor = Vendedor::find($id);

        if (!$vendedor) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vendedor no encontrado'
            ], 404);
        }

        $vendedor->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Vendedor eliminado correctamente'
        ]);
    }
}
