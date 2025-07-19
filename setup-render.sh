#!/bin/bash

# Script de setup para Render
echo "🚀 Iniciando setup para Render..."

# Verificar que las variables de entorno necesarias están disponibles
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL no está configurada"
  exit 1
fi

if [ -z "$JWT_SECRET" ]; then
  echo "❌ Error: JWT_SECRET no está configurada"
  exit 1
fi

echo "✅ Variables de entorno verificadas"

# Generar cliente de Prisma
echo "🔄 Generando cliente de Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones de base de datos..."
npx prisma migrate deploy

# Verificar que la base de datos está lista
echo "🔄 Verificando conexión a la base de datos..."
npx prisma db ping

echo "✅ Setup completado exitosamente"
