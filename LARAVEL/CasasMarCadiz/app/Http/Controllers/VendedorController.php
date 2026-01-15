<?php

namespace App\Http\Controllers;

use App\Models\Vendedor;
use Illuminate\Http\Request;

class VendedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Cargamos los primeros 1o vendedores ordenados por nombre
        $vendedores = Vendedor::orderBy('nombre')->limit(10)->get();
        $mensaje = 'exito';
        if (count($vendedores) == 0) $mensaje = 'vacio';

        //Devolvemos la lista
        return view('listaVendedores', compact('mensaje', 'vendedores'));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $vendedor = Vendedor::find($id);
        $mensaje = 'exito';
        if ($vendedor == null) $mensaje = 'error';

        return view('detalleVendedor', compact('mensaje', 'vendedor', 'mensaje_eliminar'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vendedor $vendedor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vendedor $vendedor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vendedor = Vendedor::find($id);
        $mensaje_eliminar = 'Eliminado';

        if ($vendedor == null)
            $mensaje_eliminar = 'error_eliminar';
        else
            $vendedor->delete();

        //Redireccionamos al listado principal para que cargue los vendedores y los muestre actualizados
        return redirect()->route('listadoVendedores', ['mensaje_eliminar' => $mensaje_eliminar]);
    }
}
