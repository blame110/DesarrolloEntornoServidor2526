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

        return view('detalleVendedor', compact('mensaje', 'vendedor'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('crearVendedor');
    }

    /**
     * Store a newly created resource in storage.
     * En el request nos llegan todos los datos del formulario si es post
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'nombre' => 'required|max:100',
                'nif' => 'required|max:9|unique:vendedor,nif|string',
                'fecha_nac' => 'date|required',
                'sexo' => 'in:M,F,O',
                'sueldo_base' => 'required|numeric|min:0',
            ]
        );

        $vendedor = Vendedor::create(
            $request->all()
        );

        /*
        $vendedor = Vendedor::create([
            'nombre' => $request->nombre,
            'nif' => $request->nif,
            'fecha_nac' => $request->fecha_nac,
            'sexo' => $request->sexo,
            'sueldo_base' => $request->sueldo_base,
        ]);
*/

        return redirect()->route('listadoVendedores')->with('mensaje_exito', 'Vendedor Creado Correctamente');
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {

        $vendedor = Vendedor::find($id);

        return view('editarVendedor', compact('vendedor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //Primero cargamos el registro
        $vendedor = Vendedor::find($id);

        if ($vendedor->nif != $request->nif)
            $request->validate(
                [
                    'nif' => 'required|max:9|unique:vendedor,nif|string',
                ]
            );


        $request->validate(
            [
                'nombre' => 'required|max:100',
                'nif' => 'required|max:9|string',
                'fecha_nac' => 'date|required',
                'sexo' => 'in:M,F,O',
                'sueldo_base' => 'required|numeric|min:0',
            ]
        );

        $vendedor->update($request->all());

        return redirect()->route('listadoVendedores')->with('mensaje_exito', 'Vendedor Modificado Correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vendedor = Vendedor::find($id);
        $mensaje_eliminar = 'eliminado';

        if ($vendedor == null)
            $mensaje_eliminar = 'error_eliminar';
        else
            $vendedor->delete();

        //Redireccionamos al listado principal para que cargue los vendedores y los muestre actualizados
        //Con el array asociativo llega en la url y se recoge con request en la vista
        //return redirect()->route('listadoVendedores', ['mensaje_eliminar' => $mensaje_eliminar]);
        //si se hace con with(key,value), se pasan los valores en la sesion y se recogen con session()
        return redirect()->route('listadoVendedores')->with('mensaje_eliminar', $mensaje_eliminar);
    }
}
