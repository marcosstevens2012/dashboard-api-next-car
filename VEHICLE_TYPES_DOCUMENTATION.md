# Funcionalidad de Tipos de Vehículos

## Descripción

Se ha agregado la funcionalidad para categorizar vehículos por tipo, permitiendo manejar diferentes categorías como autos, motos, camionetas, SUVs, pickups y vehículos comerciales.

## Cambios Implementados

### 1. Base de Datos

- **Nueva columna**: Se agregó la columna `tipo` a la tabla `vehicles`
- **Valores permitidos**: 'auto', 'moto', 'camioneta', 'suv', 'pickup', 'comercial'
- **Valor por defecto**: 'auto'

### 2. Entidad Vehicle

```typescript
@Column({ default: 'auto' })
tipo: string;
```

### 3. DTOs Actualizados

#### CreateVehicleDto

```typescript
@ApiProperty({
  description: 'Tipo de vehículo',
  enum: ['auto', 'moto', 'camioneta', 'suv', 'pickup', 'comercial'],
  example: 'auto',
})
@IsString()
@IsNotEmpty()
tipo: string;
```

#### UpdateVehicleDto

```typescript
@IsOptional()
@IsString()
@IsNotEmpty()
tipo?: string;
```

#### VehicleFiltersDto

```typescript
@ApiPropertyOptional({
  description: 'Filtrar por tipo de vehículo',
  enum: ['auto', 'moto', 'camioneta', 'suv', 'pickup', 'comercial'],
  example: 'auto',
})
@IsOptional()
@IsString()
tipo?: string;
```

### 4. Servicio de Vehículos

#### Filtrado por Tipo

- Se agregó soporte para filtrar vehículos por tipo en el método `findAllPaginated`
- El filtro se incluye en la consulta SQL cuando se proporciona

#### Estadísticas por Tipo

- Se agregó `vehiclesByType` en el método `getStats()` que devuelve un conteo de vehículos por tipo

#### Opciones de Filtro

- Se agregó `tipos` en el método `getFilterOptions()` que devuelve todos los tipos disponibles

#### Ordenamiento

- Se puede ordenar por `tipo` utilizando el parámetro `sortBy=tipo`

### 5. Datos de Ejemplo

Se agregaron vehículos de ejemplo en el seed:

- **Autos**: Chevrolet Onix Premier
- **SUVs**: Toyota Corolla Cross, Ford EcoSport, Honda HR-V
- **Pickups**: Volkswagen Amarok V6
- **Motos**: Honda CB 600F Hornet, Yamaha MT-07

## API Endpoints

### Filtrar por Tipo

```http
GET /vehicles?tipo=moto
GET /vehicles?tipo=suv
GET /dashboard/vehicles?tipo=auto
```

### Ordenar por Tipo

```http
GET /vehicles?sortBy=tipo&sortOrder=asc
```

### Obtener Opciones de Filtro

```http
GET /vehicles/filter-options
```

Respuesta incluirá:

```json
{
  "tipos": ["auto", "moto", "suv", "pickup", "camioneta"]
}
```

### Estadísticas por Tipo

```http
GET /vehicles/stats
```

Respuesta incluirá:

```json
{
  "vehiclesByType": {
    "auto": 1,
    "suv": 3,
    "pickup": 1,
    "moto": 2
  }
}
```

## Casos de Uso

### 1. Frontend - Selector de Tipo

Los frontends pueden mostrar un dropdown con los tipos disponibles obtenidos de `/vehicles/filter-options`.

### 2. Filtrado Específico

Los usuarios pueden filtrar solo motos, solo autos, etc., para encontrar exactamente lo que buscan.

### 3. Dashboard Analytics

El dashboard puede mostrar gráficos con la distribución de vehículos por tipo.

### 4. Validación

El sistema validará que solo se ingresen tipos válidos según el enum definido.

## Migración de Datos Existentes

Los vehículos existentes tendrán automáticamente el tipo 'auto' como valor por defecto. Si necesitas actualizar vehículos específicos a otros tipos, puedes usar:

```sql
UPDATE vehicles SET tipo = 'suv' WHERE modelo LIKE '%SUV%' OR modelo LIKE '%Cross%';
UPDATE vehicles SET tipo = 'pickup' WHERE modelo LIKE '%Amarok%' OR modelo LIKE '%Hilux%';
```

## Consideraciones Futuras

- Se puede extender fácilmente agregando nuevos tipos al enum
- Los tipos pueden utilizarse para personalizar campos específicos (ej: motos no necesitan ciertos campos de autos)
- Se puede implementar pricing diferenciado por tipo de vehículo
