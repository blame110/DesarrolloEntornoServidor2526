<?php

use Illuminate\Support\Facades\Route;
use App\Models\Vendedor;
use App\Models\Comprador;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\VendedorController;




Route::get('/', [VendedorController::class,'index']);
Route::get('/mostrar/{id}',[VendedorController::class,'show']);


Route::get('/hola', function () {
    return "Hola Mundo <br> Muajajaja";
});

Route::get('/vendedores', function () {
    $vendedores = Vendedor::all();
    return $vendedores;
});

Route::get('/vendedor/cantidad', function () {
    $vendedor = Vendedor::count();
    return $vendedor;
});

Route::get('/vendedor/sueldo-alto',function () {

    $vendedores = Vendedor::where('sueldo_base','>','50000')->get();
    return $vendedores;
    
});

Route::get('/vendedor/sueldo-between',function () {

    $vendedores = Vendedor::whereBetween('sueldo_base',[30000,70000])->get();
    return $vendedores;
    
});

Route::get('/vendedor/sueldo-alto',function () {

    $vendedores = Vendedor::where('sueldo_base','>','50000')->get();
    return $vendedores;
    
});

Route::get('/vendedor/contar-sueldo-alto',function () {

    $vendedores = Vendedor::where('sueldo_base','>','50000')->count();
    return $vendedores;
    
});

Route::get('/vendedor/max-sueldo',function () {

    $vendedores = Vendedor::max('sueldo_base');
    return $vendedores;
    
});

Route::get('/vendedor/idin',function () {

    $vendedores = Vendedor::whereIn('id',[3,7,12,167,34])->get();
    return $vendedores;
    
});

Route::get('/vendedor/sueldoynombre',function () {

    $vendedores = Vendedor::where('sueldo_base','>','20000')
    ->where('nombre','like','M%')
    ->orderBy('sexo','desc')
    ->orderBy('nombre')->get();
    return $vendedores;
    
});

Route::get('/vendedor/triplecondicion/',function () {

    $vendedores = Vendedor::where('sueldo_base','>','50000')
    ->where(function ($query)
    {
        $query->where('nombre','like','M%')
        ->orWhere('sexo','=','F');
    })->get();
   
    return $vendedores;
    
});

Route::get('/vendedor/{id}', function ($id) {
    $vendedor = Vendedor::findorFail($id);
    return $vendedor;
});

Route::get('/primero', function () {
    $vendedor = Vendedor::orderBy('nombre')->first();
    return $vendedor;
});

Route::get('/ultimo', function () {
    $vendedor = Vendedor::orderBy('nombre', 'desc')->first();
    return $vendedor;
});

Route::get('/ultimo', function () {
    $vendedor = Vendedor::orderBy('nombre', 'desc')->first();
    
    return $vendedor;
});

Route::get('/compradores-paginado',function(){
    //elemengos por pagina, campos, nombre pagina, numero pagina
    return Comprador::paginate(5,"*","",4);
});

Route::get('/compradoras-paginado',function(){
    //elemengos por pagina, campos, nombre pagina, numero pagina
    return Comprador::where('sexo','=','F')
    ->paginate(5,"*","",4);
});

Route::get('/vendedores-paginado',function(){
    return Vendedor::simplePaginate(5);
});

Route::get("/crear-comprador",function(){
    $comprador = Comprador::create([
        'nombre' => 'Adri',
        'nif' => '23232323j',
        'fecha_nac' => '2001-02-29',
        'sexo' => 'M',
    ]);

    return $comprador;

});


Route::get("/crear-comprador-v2",function(){
    $comprador = new Comprador();
    $comprador->nombre = "David";
    $comprador->nif = "34343434f";
    $comprador->sexo = 'N';
    $comprador->fecha_nac ='2001-02-29';

    $comprador->save();

    return $comprador;

});

Route::get("/modificar-comprador/{id}",function($id){
    $comprador = Comprador::find($id);
    
    $comprador->nombre = "Jairo";
    $comprador->save();

    return $comprador;

});

//Subir 100 euros a los no milenial
Route::get("/vendedor-subir-sueldo",function(){
    
    $actualizados = Vendedor::where('fecha_nac','<','2000-01-01')
    ->update([
        'sueldo_base' => DB::raw('sueldo_base + 100')
    ]);
    return $actualizados;

});


Route::get("/borrar-vendedor/{id}",function($id){

    $vendedor = Vendedor::findorFail($id);

    $cantidad = $vendedor->delete();

    return $cantidad;

});

Route::get("/borrar-vendedores",function(){

    $cantidad = Vendedor::destroy([11,12,13]);
    return $cantidad;

});

Route::get("/borrar-vendedores-machos",function(){

    $cantidad = Vendedor::where('sexo','=','M')
    ->orderBy('nombre')
    ->limit(10)
    ->delete();

    return $cantidad;

});







