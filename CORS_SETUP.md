# 🌐 Configuración CORS para Frontend en Vercel

## Problema Identificado

Error de CORS al hacer login desde Vercel indica que el API no permite requests desde el dominio del frontend.

## ✅ Solución Inmediata

### Paso 1: Configurar el Dominio de tu Frontend

1. **Obtén la URL de tu deployment en Vercel**
   - Ve a tu dashboard de Vercel
   - Copia la URL de tu proyecto (ej: `https://mi-proyecto-abc123.vercel.app`)

2. **Configura la variable de entorno en Render**
   - Ve a tu Web Service en Render
   - Environment → Add Environment Variable
   - Agregar:
     ```
     Key: FRONTEND_URL
     Value: https://tu-proyecto.vercel.app
     ```

### Paso 2: Dominios que ya están permitidos

El API ahora acepta requests desde:
- ✅ `*.vercel.app` (todos los subdominios de Vercel)
- ✅ `nextcar-dashboard.vercel.app`
- ✅ Tu dominio personalizado (vía FRONTEND_URL)

## 🔧 Para Testing Inmediato

Si necesitas probar ahora mismo, puedes usar estas URLs de ejemplo:

### Desde tu Frontend en Vercel:
```javascript
// Usar la URL de tu API en Render
const API_URL = 'https://nextcar-dashboard-api.onrender.com';

// Para login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Importante para CORS
  body: JSON.stringify({
    username: 'admin',
    password: 'tu-password'
  })
});
```

## 🚨 Troubleshooting

### Error: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"

**Causas:**
1. ❌ FRONTEND_URL no configurada en Render
2. ❌ URL del frontend no incluida en allowed origins
3. ❌ Falta `credentials: 'include'` en fetch

**Solución:**
1. ✅ Configurar FRONTEND_URL en Render Environment
2. ✅ Reiniciar el deployment en Render
3. ✅ Verificar que el fetch incluya `credentials: 'include'`

### Verificar en Logs

Los logs de Render ahora mostrarán:
```
🌐 CORS Origins allowed: [Array of allowed origins]
```

## 📋 Checklist

- [ ] URL del frontend obtenida de Vercel
- [ ] FRONTEND_URL configurada en Render
- [ ] Deploy reiniciado en Render
- [ ] Frontend usa `credentials: 'include'`
- [ ] Verificar en Network tab del browser

## 🔗 URLs de Ejemplo

- **Frontend Vercel**: `https://mi-proyecto-abc123.vercel.app`
- **API Render**: `https://nextcar-dashboard-api.onrender.com`
- **Login endpoint**: `https://nextcar-dashboard-api.onrender.com/auth/login`

## ⚡ Solución Rápida (Solo para Testing)

Si necesitas una solución inmediata para probar, puedes configurar temporalmente CORS para permitir todas las origins en desarrollo. Pero NO recomiendo esto para producción.
