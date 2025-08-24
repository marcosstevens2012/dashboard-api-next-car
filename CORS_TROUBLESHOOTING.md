# CORS Troubleshooting - NextCar Dashboard API

## Problema Detectado: 24 Aug 2025

### Síntomas

- La API responde correctamente (HTTP 200) pero sin headers CORS
- Error de CORS al hacer requests desde `https://www.nextcar.com.ar`
- Los headers `Access-Control-Allow-Origin` no aparecen en la respuesta

### Diagnóstico

Al probar con curl desde el origen `https://www.nextcar.com.ar`:

```bash
curl -i 'https://dashboard-api-next-car-production.up.railway.app/public/vehicles?page=1&limit=1' \
  -H 'Origin: https://www.nextcar.com.ar' \
  -H 'Access-Control-Request-Method: GET'
```

**Resultado:** La respuesta no incluía los headers de CORS necesarios:

- ❌ Faltaba `Access-Control-Allow-Origin`
- ❌ El origen `https://www.nextcar.com.ar` no estaba en la lista permitida

### Causa Raíz

El middleware CORS no estaba habilitando el origen `https://www.nextcar.com.ar` porque:

1. No estaba explícitamente agregado en la lista de orígenes permitidos
2. Solo dependía de `process.env.FRONTEND_URL` que no incluía todos los dominios necesarios

### Solución Implementada

Se actualizó `src/main.ts` para incluir explícitamente todos los dominios de nextcar.com.ar:

```typescript
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'https://nextcar-dashboard-api.onrender.com',
        'https://www.nextcar-dashboard-api.onrender.com',
        /^https:\/\/.*\.vercel\.app$/,
        'https://nextcar-dashboard.vercel.app',
        'https://www.nextcar-dashboard.vercel.app',
        // ✅ DOMINIOS AGREGADOS:
        'https://nextcar.com.ar',
        'https://www.nextcar.com.ar',
        'http://nextcar.com.ar',
        'http://www.nextcar.com.ar',
        process.env.FRONTEND_URL,
      ].filter((origin): origin is string | RegExp => Boolean(origin))
    : true;
```

### Pasos para Verificar la Solución

1. **Redeploy** la aplicación en Railway
2. **Probar con curl** después del deploy:

```bash
curl -i 'https://dashboard-api-next-car-production.up.railway.app/public/vehicles?page=1&limit=1' \
  -H 'Origin: https://www.nextcar.com.ar' \
  -H 'Access-Control-Request-Method: GET'
```

3. **Verificar headers esperados** en la respuesta:

```
Access-Control-Allow-Origin: https://www.nextcar.com.ar
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
```

### Prevención Futura

- ✅ Siempre agregar TODOS los dominios (con y sin www, http y https)
- ✅ Probar con curl antes de hacer deploy
- ✅ Verificar logs de CORS en producción: `console.log('🌐 CORS Origins allowed:', allowedOrigins)`

### Comando de Prueba Rápida

```bash
# Test CORS para nextcar.com.ar
curl -i 'https://dashboard-api-next-car-production.up.railway.app/public/vehicles?page=1&limit=1' \
  -H 'Origin: https://www.nextcar.com.ar' \
  -H 'Access-Control-Request-Method: GET' | grep -i "access-control"
```

---

**Nota:** Este problema indica que el middleware CORS no está habilitando ese origen (o está siendo "pisado" por otro middleware/headers).
