#!/bin/bash

# Script para ejecutar migraciones con la conexión correcta

echo "🔄 Ejecutando migraciones de Prisma..."
echo ""

# Exportar la URL directa para migraciones (sin pooler)
export DATABASE_URL="postgresql://postgres.lmjicsbdyvmnxnfnshgi:wP8Sq1fViz8z2eIK@aws-0-us-east-2.pooler.supabase.com:5432/postgres"

echo "📍 Usando conexión directa para migraciones (puerto 5432)"
echo "🔗 $DATABASE_URL"
echo ""

# Ejecutar la migración
echo "⚡ Ejecutando: npx prisma migrate dev --name $1"
npx prisma migrate dev --name "$1"

echo ""
echo "✅ Migración completada"
echo ""
echo "🔄 Generando cliente de Prisma..."
npx prisma generate

echo ""
echo "✅ ¡Todo listo! Puedes iniciar la aplicación con npm run start:dev"
