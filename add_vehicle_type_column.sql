-- Agregar columna 'tipo' a la tabla vehicles con valor por defecto 'auto'
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS tipo VARCHAR(50) NOT NULL DEFAULT 'auto';

-- Comentario descriptivo
COMMENT ON COLUMN vehicles.tipo IS 'Tipo de vehículo: auto, moto, camioneta, suv, pickup, comercial';
