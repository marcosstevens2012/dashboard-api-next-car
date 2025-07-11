# 🚀 **NEXTCAR Website - Quick Start Template**

## 📦 **Package.json Setup**

```json
{
  "name": "nextcar-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "preview": "next build && next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",

    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@tailwindcss/forms": "^0.5.0",
    "@tailwindcss/typography": "^0.5.0",

    "axios": "^1.5.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",

    "zustand": "^4.4.0",
    "react-query": "^3.39.0",

    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^2.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0",

    "swiper": "^10.3.0",
    "react-intersection-observer": "^9.5.0",
    "framer-motion": "^10.16.0",

    "google-maps-react": "^2.0.0",
    "@googlemaps/js-api-loader": "^1.16.0"
  },
  "devDependencies": {
    "eslint": "^8.51.0",
    "eslint-config-next": "^14.0.0",
    "@tailwindcss/line-clamp": "^0.4.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

## ⚙️ **Configuration Files**

### **tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fefce8',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

### **next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.nextcar.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.nextcar.com',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: 'nextcar-website',
  },
  async redirects() {
    return [
      {
        source: '/autos',
        destination: '/vehiculos',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### **tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/services/*": ["./services/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 📁 **Initial File Structure**

```bash
mkdir nextcar-website
cd nextcar-website
npx create-next-app@latest . --typescript --tailwind --app

# Create folder structure
mkdir -p {components,lib,services,hooks,types,stores}
mkdir -p components/{layout,home,vehicles,contact,ui}
mkdir -p public/{images,icons,brand-logos}
```

## 🔧 **Environment Variables**

### **.env.local**

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_IMAGES_URL=http://localhost:3000

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_SITE_NAME="NEXTCAR - Vehículos Usados"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Contact Information
NEXT_PUBLIC_COMPANY_NAME="NEXTCAR"
NEXT_PUBLIC_COMPANY_PHONE="+54 11 1234-5678"
NEXT_PUBLIC_COMPANY_EMAIL="ventas@nextcar.com"
NEXT_PUBLIC_COMPANY_ADDRESS="Av. Rivadavia 1234, CABA, Argentina"

# Social Media
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/nextcar"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/nextcar"
NEXT_PUBLIC_WHATSAPP_NUMBER="+5491123456789"
```

### **.env.example**

```env
# Copy to .env.local and fill with your values
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id_here
# ... rest of variables
```

## 📄 **Core Files Template**

### **app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXTCAR - Vehículos Usados de Calidad',
  description:
    'Encuentra tu próximo auto ideal. Vehículos usados de calidad con garantía. Financiación disponible.',
  keywords: ['autos usados', 'vehículos', 'financiación', 'garantía'],
  authors: [{ name: 'NEXTCAR' }],
  openGraph: {
    title: 'NEXTCAR - Vehículos Usados de Calidad',
    description:
      'Encuentra tu próximo auto ideal. Vehículos usados de calidad con garantía.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'NEXTCAR',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEXTCAR',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### **app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply text-gray-900 bg-white;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-display font-semibold;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }

  .btn-secondary {
    @apply btn bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400;
  }

  .btn-outline {
    @apply btn bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500;
  }

  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }

  .input {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500;
  }

  .container-custom {
    @apply container mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-12 sm:py-16 lg:py-20;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .aspect-ratio-16-9 {
    aspect-ratio: 16 / 9;
  }

  .aspect-ratio-4-3 {
    aspect-ratio: 4 / 3;
  }
}

/* Loading animations */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}
```

### **lib/api.ts**

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  IMAGES_URL: process.env.NEXT_PUBLIC_IMAGES_URL || 'http://localhost:3000',
  ENDPOINTS: {
    VEHICLES: '/public/vehicles',
    FEATURED: '/public/vehicles/featured',
    VEHICLE_DETAIL: (id: string) => `/public/vehicles/${id}`,
    FILTER_OPTIONS: '/public/vehicles/filter-options',
    CONTACT: '/public/contacts',
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const formatImageUrl = (url: string) => {
  if (url.startsWith('http')) return url;
  return `${API_CONFIG.IMAGES_URL}${url}`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatYear = (year: number) => {
  return year.toString();
};

export const formatKilometers = (km: string | number) => {
  if (typeof km === 'string') return km;
  return new Intl.NumberFormat('es-AR').format(km) + ' km';
};
```

### **lib/types.ts**

```typescript
export interface Vehicle {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string;
  destacado: boolean;
  createdAt: string;
  updatedAt: string;

  // Basic info
  kilometraje?: string;
  observaciones?: string;

  // Engine
  combustible?: string;
  cilindrada?: string;
  potencia?: string;
  alimentacion?: string;
  cilindros?: number;
  valvulas?: number;

  // Transmission
  traccion?: string;
  transmision?: string;
  velocidades?: string;
  neumaticos?: string;
  frenosDelanteros?: string;
  frenosTraseros?: string;
  direccionAsistida?: boolean;
  direccionAsistidaTipo?: string;

  // Comfort
  aireAcondicionado?: boolean;
  asientoDelanteroAjuste?: boolean;
  volanteRegulable?: boolean;
  asientosTraseros?: string;
  tapizados?: string;
  cierrePuertas?: string;
  vidriosDelanteros?: string;
  vidriosTraseros?: string;
  espejosExteriores?: string;
  farosAntiniebla?: boolean;
  computadoraBordo?: boolean;
  llantasAleacion?: boolean;
  camaraEstacionamiento?: boolean;
  asistenciaArranquePendientes?: boolean;
  controlEconomiaCombustible?: boolean;
  luzDiurna?: boolean;

  // Safety
  abs?: boolean;
  distribucionElectronicaFrenado?: boolean;
  asistenciaFrenadaEmergencia?: boolean;
  airbagsDelanteros?: boolean;
  airbagsCortina?: string;
  airbagRodillaConductor?: boolean;
  airbagsLaterales?: string;
  alarma?: boolean;
  inmovilizadorMotor?: boolean;
  anclajeAsientosInfantiles?: boolean;
  autobloqueoPuertas?: boolean;
  controlEstabilidad?: boolean;
  controlTraccion?: boolean;
  cantidadAirbags?: number;

  // Entertainment
  equipoMusica?: string;
  comandosVolante?: boolean;
  conexionAuxiliar?: boolean;
  conexionUSB?: boolean;
  interfazBluetooth?: boolean;
  controlVozDispositivos?: boolean;
  pantalla?: boolean;
  sistemaNavegacionGPS?: boolean;
  appleCarPlay?: boolean;
  mirrorlink?: boolean;

  // Relations
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
  vehicleId: string;
  createdAt: string;
}

export interface VehicleFilters {
  search?: string;
  marca?: string;
  combustible?: string;
  transmision?: string;
  traccion?: string;
  anioMin?: number;
  anioMax?: number;
  precioMin?: number;
  precioMax?: number;
  destacado?: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  marcas: string[];
  combustibles: string[];
  transmisiones: string[];
  tracciones: string[];
  anioMin: number;
  anioMax: number;
  precioMin: number;
  precioMax: number;
}

export interface ContactFormData {
  nombre: string;
  apellido: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  email: string;
  mensaje: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  avatar?: string;
  date?: string;
}

export interface Brand {
  name: string;
  logo: string;
  href?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavigationItem[];
}
```

### **components/Providers.tsx**

```tsx
'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

## 🚀 **Getting Started Script**

```bash
#!/bin/bash
# setup.sh

echo "🚀 Setting up NEXTCAR Website..."

# Install dependencies
npm install

# Create necessary directories
mkdir -p public/images/{vehicles,logos,testimonials}
mkdir -p public/icons

# Copy environment file
cp .env.example .env.local

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API URL and keys"
echo "2. Run 'npm run dev' to start development"
echo "3. Open http://localhost:3001"
echo ""
echo "📚 Read the documentation in WEBSITE_DEVELOPMENT_PROMPT.md"
```

## 📋 **Development Checklist**

### **Phase 1: Setup & Core Structure**

- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure
- [ ] Configure environment variables
- [ ] Set up API client and types
- [ ] Create basic layout components (Header, Footer)

### **Phase 2: Home Page**

- [ ] Create Hero banner component
- [ ] Implement featured vehicles section
- [ ] Add client reviews/testimonials
- [ ] Create brand logos section
- [ ] Build newsletter signup
- [ ] Complete footer with contact info

### **Phase 3: Vehicle Listing**

- [ ] Create vehicle grid component
- [ ] Implement filter sidebar
- [ ] Add pagination
- [ ] Set up sorting functionality
- [ ] Create vehicle card component
- [ ] Add responsive design

### **Phase 4: Vehicle Detail & Contact**

- [ ] Build vehicle detail page
- [ ] Create image gallery component
- [ ] Implement vehicle specifications display
- [ ] Create contact form
- [ ] Add Google Maps integration
- [ ] Set up form validation

### **Phase 5: Polish & Optimization**

- [ ] Add loading states and skeletons
- [ ] Implement error handling
- [ ] Optimize images and performance
- [ ] Add SEO metadata
- [ ] Test responsive design
- [ ] Add accessibility features

### **Phase 6: Testing & Deployment**

- [ ] Test all functionality
- [ ] Validate forms
- [ ] Test API integration
- [ ] Performance audit
- [ ] Deploy to production
- [ ] Set up analytics

Este template te dará una base sólida para comenzar el desarrollo del sitio web. Todos los archivos están configurados con las mejores prácticas de Next.js 14 y preparados para integrarse con tu API.
