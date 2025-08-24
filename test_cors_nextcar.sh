#!/bin/bash

# Test CORS para nextcar.com.ar después del deploy
echo "🧪 Testing CORS for nextcar.com.ar..."
echo "============================================="

echo ""
echo "📋 Testing with Origin: https://www.nextcar.com.ar"
echo "---------------------------------------------------"

curl -i 'https://dashboard-api-next-car-production.up.railway.app/public/vehicles?page=1&limit=1' \
  -H 'Origin: https://www.nextcar.com.ar' \
  -H 'Access-Control-Request-Method: GET' \
  2>/dev/null | grep -E "(HTTP|access-control|Access-Control)"

echo ""
echo "📋 Testing with Origin: https://nextcar.com.ar"
echo "-----------------------------------------------"

curl -i 'https://dashboard-api-next-car-production.up.railway.app/public/vehicles?page=1&limit=1' \
  -H 'Origin: https://nextcar.com.ar' \
  -H 'Access-Control-Request-Method: GET' \
  2>/dev/null | grep -E "(HTTP|access-control|Access-Control)"

echo ""
echo "✅ If you see 'Access-Control-Allow-Origin' headers above, CORS is working!"
echo "❌ If no CORS headers appear, the issue persists."
echo ""
echo "🔄 Remember to REDEPLOY your app on Railway first!"
