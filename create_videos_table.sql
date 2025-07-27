-- Crear tabla videos manualmente
CREATE TABLE IF NOT EXISTS "public"."videos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "filename" TEXT,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- Agregar foreign key constraint
ALTER TABLE "public"."videos" 
ADD CONSTRAINT "videos_vehicleId_fkey" 
FOREIGN KEY ("vehicleId") 
REFERENCES "public"."vehicles"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;
