-- SQL para crear la tabla videos en Supabase
-- Ejecutar este SQL directamente en el SQL Editor de Supabase

-- Crear tabla videos
CREATE TABLE IF NOT EXISTS "public"."videos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "filename" TEXT,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- Crear foreign key constraint hacia vehicles
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'videos_vehicleId_fkey'
    ) THEN
        ALTER TABLE "public"."videos" 
        ADD CONSTRAINT "videos_vehicleId_fkey" 
        FOREIGN KEY ("vehicleId") 
        REFERENCES "public"."vehicles"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Verificar que la tabla se creó correctamente
SELECT table_name, column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'videos' 
ORDER BY ordinal_position;
