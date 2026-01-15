<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Vendedores</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container my-4">
    <h1 class="mb-4">Lista de Vendedores</h1>

    @if(isset($mensaje_eliminar) && $mensaje_eliminar == 'error_eliminar')
        <div class="alert alert-warning fade show">
            No se pudo eliminar el vendedor
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @elseif(isset($mensaje_eliminar) && $mensaje_eliminar == 'Eliminado')
        <div class="alert alert-success ">
            Se elimino correctamente el vendedor
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    @if($mensaje == 'vacio')
        <div class="alert alert-warning">
            No hay vendedores registrados.
        </div>
    @else
        <div class="mb-3">
            <a href="/vendedores/crear" class="btn btn-success">+ Nuevo Vendedor</a>
        </div>

        <div class="card">
            <div class="card-body p-0">
                <table class="table table-striped table-hover mb-0">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>NIF</th>
                            <th>Fecha Nac.</th>
                            <th>Sexo</th>
                            <th>Sueldo Base</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($vendedores as $vendedor)
                            <tr>
                                <td>{{ $vendedor->id }}</td>
                                <td>{{ $vendedor->nombre }}</td>
                                <td><code>{{ $vendedor->nif }}</code></td>
                                <td>{{ $vendedor->fecha_nac->format('d/m/Y') }}</td>
                                <td>
                                    @if($vendedor->sexo == 'M')
                                        <span class="badge bg-primary">Masculino</span>
                                    @elseif($vendedor->sexo == 'F')
                                        <span class="badge bg-danger">Femenino</span>
                                    @else
                                        <span class="badge bg-secondary">Otro</span>
                                    @endif
                                </td>
                                <td>{{ $vendedor->sueldo_base }}</td>
                                <td>
                                    <a href="/mostrar/{{ $vendedor->id }}" class="btn btn-sm btn-info">Ver</a>
                                    <a href="/vendedores/{{ $vendedor->id }}/editar" class="btn btn-sm btn-warning">Editar</a>
                                    <a href="/vendedores/{{ $vendedor->id }}/eliminar" class="btn btn-sm btn-danger">Eliminar</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>