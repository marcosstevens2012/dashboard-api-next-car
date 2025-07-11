#!/bin/bash

# Script de configuración inicial para Dashboard API
echo "🚀 Configurando Dashboard API..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instálalo primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor, instálalo primero."
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Iniciar PostgreSQL con Docker
echo "🐘 Iniciando PostgreSQL con Docker..."
docker-compose up -d postgres

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 5

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones de base de datos..."
npm run db:migrate

# Generar cliente Prisma
echo "🔧 Generando cliente Prisma..."
npm run db:generate

# Poblar base de datos con datos de prueba
echo "🌱 Poblando base de datos con datos de prueba..."
npm run db:seed

# Construir la aplicación
echo "🏗️ Construyendo la aplicación..."
npm run build

echo "✅ Configuración completada!"
echo ""
echo "Para iniciar la aplicación en modo desarrollo:"
echo "  npm run start:dev"
echo ""
echo "Para acceder a la documentación:"
echo "  http://localhost:3000/api"
echo ""
echo "Para gestionar la base de datos:"
echo "  npm run db:studio"
