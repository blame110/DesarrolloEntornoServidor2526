<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle de Vendedor</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container my-4">
    <h1 class="mb-4">Detalle del Vendedor</h1>

    @if($mensaje == 'error')
        <div class="alert alert-danger">
            Vendedor no encontrado.
        </div>
        <a href="/" class="btn btn-secondary">← Volver al listado</a>
    @else
        <div class="card" style="max-width: 600px;">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">{{ $vendedor->nombre }}</h5>
            </div>
            <div class="card-body">
                <table class="table table-borderless mb-0">
                    <tr>
                        <th style="width: 40%;">ID:</th>
                        <td>{{ $vendedor->id }}</td>
                    </tr>
                    <tr>
                        <th>Nombre:</th>
                        <td>{{ $vendedor->nombre }}</td>
                    </tr>
                    <tr>
                        <th>NIF:</th>
                        <td><code>{{ $vendedor->nif }}</code></td>
                    </tr>
                    <tr>
                        <th>Fecha Nacimiento:</th>
                        <td>{{ $vendedor->fecha_nac->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <th>Sexo:</th>
                        <td>
                            @if($vendedor->sexo == 'M')
                                <span class="badge bg-primary">Masculino</span>
                            @elseif($vendedor->sexo == 'F')
                                <span class="badge bg-danger">Femenino</span>
                            @else
                                <span class="badge bg-secondary">Otro</span>
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <th>Sueldo Base:</th>
                        <td><strong class="text-success">{{ $vendedor->sueldo_formateado }}</strong></td>
                    </tr>
                </table>
            </div>
            <div class="card-footer">
                <a href="/" class="btn btn-secondary">← Volver</a>
                <a href="/vendedores/{{ $vendedor->id }}/editar" class="btn btn-warning">Editar</a>
                <a href="/vendedores/{{ $vendedor->id }}/eliminar" class="btn btn-danger">Eliminar</a>
            </div>
        </div>
    @endif
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>