# 🌐 **NEXTCAR Website - Prompt de Desarrollo Completo**

## 📋 **Descripción del Proyecto**

Desarrollar el sitio web público de NEXTCAR para mostrar y vender vehículos usados. El sitio consumirá los endpoints públicos de la API y tendrá un diseño moderno, responsivo y optimizado para conversión.

## 🎯 **Estructura del Sitio Web**

### **📄 Páginas Principales**

1. **🏠 Página de Inicio (`/`)**
   - Header con menú de navegación
   - Banner hero con CTAs principales
   - Sección de vehículos destacados
   - Reviews/testimonios de clientes
   - Logos de marcas representadas
   - Newsletter de suscripción
   - Footer completo con datos de contacto y mapa

2. **🚗 Listado de Vehículos (`/vehiculos`)**
   - Filtros laterales (izquierda)
   - Grid de vehículos con paginación
   - Búsqueda y ordenamiento
   - Responsive design

3. **📞 Página de Contacto (`/contacto`)**
   - Formulario de contacto
   - Información de la empresa
   - Mapa interactivo
   - Datos de contacto

4. **🔍 Detalle de Vehículo (`/vehiculos/[id]`)**
   - Galería de imágenes
   - Especificaciones completas
   - Formulario de consulta
   - Vehículos relacionados

## 🛠️ **Stack Tecnológico**

```json
{
  "framework": "Next.js 14+ (App Router)",
  "styling": "Tailwind CSS",
  "components": "Headless UI / Radix UI",
  "forms": "React Hook Form + Zod",
  "http": "Axios",
  "state": "Zustand (para filtros/carrito)",
  "maps": "Google Maps API",
  "images": "Next.js Image + Cloudinary (opcional)",
  "seo": "Next.js SEO + structured data",
  "analytics": "Google Analytics 4"
}
```

## 📁 **Estructura de Archivos**

```
nextcar-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Página de inicio
│   ├── vehiculos/
│   │   ├── page.tsx               # Listado de vehículos
│   │   └── [id]/
│   │       └── page.tsx           # Detalle de vehículo
│   ├── contacto/
│   │   └── page.tsx               # Página de contacto
│   ├── globals.css
│   └── sitemap.xml
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── FeaturedVehicles.tsx
│   │   ├── ClientReviews.tsx
│   │   ├── BrandLogos.tsx
│   │   └── Newsletter.tsx
│   ├── vehicles/
│   │   ├── VehicleGrid.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleFilters.tsx
│   │   ├── VehicleDetail.tsx
│   │   └── VehicleGallery.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   └── Map.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── api.ts                     # Configuración API
│   ├── types.ts                   # Tipos TypeScript
│   ├── utils.ts                   # Utilidades
│   └── validations.ts             # Esquemas Zod
├── services/
│   ├── vehicleService.ts          # Servicios de vehículos
│   └── contactService.ts          # Servicios de contacto
├── hooks/
│   ├── useVehicles.ts
│   ├── useFilters.ts
│   └── useContact.ts
├── stores/
│   └── filterStore.ts             # Estado global filtros
└── public/
    ├── images/
    ├── icons/
    └── brand-logos/
```

## 🎨 **Diseño y UX Requirements**

### **🎨 Paleta de Colores**

```css
:root {
  --primary: #1e40af; /* Azul principal */
  --primary-dark: #1e3a8a; /* Azul oscuro */
  --secondary: #f59e0b; /* Amarillo/naranja */
  --accent: #10b981; /* Verde éxito */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-900: #111827;
  --white: #ffffff;
  --black: #000000;
}
```

### **📱 Responsive Design**

- Mobile First approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly interactions
- Progressive enhancement

### **⚡ Performance**

- Lazy loading de imágenes
- Code splitting por rutas
- Optimización de Core Web Vitals
- CDN para assets estáticos

## 🔌 **Integración con API**

### **📡 Configuración de API**

```typescript
// lib/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    VEHICLES: '/public/vehicles',
    FEATURED: '/public/vehicles/featured',
    VEHICLE_DETAIL: (id: string) => `/public/vehicles/${id}`,
    FILTER_OPTIONS: '/public/vehicles/filter-options',
    CONTACT: '/public/contacts',
  },
  IMAGES_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
};
```

### **🚗 Servicios de Vehículos**

```typescript
// services/vehicleService.ts
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

export class VehicleService {
  static async getVehicles(filters?: VehicleFilters, pagination?: Pagination) {
    // Implementar con rate limiting handling
  }

  static async getFeaturedVehicles(limit = 6) {
    // Para homepage
  }

  static async getVehicleDetail(id: string) {
    // Para página de detalle
  }

  static async getFilterOptions() {
    // Para opciones de filtros dinámicas
  }
}
```

## 📄 **Especificaciones de Páginas**

### **🏠 1. Página de Inicio**

#### **Header**

```tsx
- Logo NEXTCAR (izquierda)
- Menú: Inicio | Vehículos | Contacto | Sobre Nosotros
- Botón CTA: "Ver Inventario"
- Responsive: hamburger menu en mobile
```

#### **Hero Banner**

```tsx
- Imagen de fondo: showroom/vehículos
- Título: "Encuentra tu próximo auto ideal"
- Subtítulo: "Vehículos usados de calidad con garantía"
- 2 CTAs: "Ver Inventario" + "Contactanos"
- Buscador rápido (opcional)
```

#### **Vehículos Destacados**

```tsx
- Título: "Vehículos Destacados"
- Grid responsive: 3 columnas desktop, 2 tablet, 1 mobile
- Card por vehículo: imagen, nombre, precio, año, specs básicas
- CTA: "Ver más detalles"
- Link al final: "Ver todo el inventario"
```

#### **Reviews de Clientes**

```tsx
- Título: "Lo que dicen nuestros clientes"
- Carousel/grid de testimonios
- Cada review: foto, nombre, ciudad, comentario, rating
- 4-6 reviews fake inicialmente
```

#### **Logos de Marcas**

```tsx
- Título: "Marcas que representamos"
- Grid de logos: Toyota, Honda, Ford, Chevrolet, etc.
- Logos en escala de grises, color en hover
- Responsive: 6 columnas desktop, 4 tablet, 3 mobile
```

#### **Newsletter**

```tsx
- Fondo de color/imagen
- Título: "Mantente informado"
- Subtítulo: "Recibe ofertas especiales y nuevos arrivals"
- Input email + botón "Suscribirse"
- Disclaimer GDPR
```

#### **Footer**

```tsx
- 4 columnas:
  1. Logo + descripción breve
  2. Enlaces rápidos (navegación)
  3. Contacto (teléfono, email, dirección)
  4. Redes sociales + horarios
- Mapa pequeño integrado (opcional)
- Copyright + términos legales
```

### **🚗 2. Página de Vehículos**

#### **Layout**

```tsx
- Sidebar izquierda (25%): Filtros
- Contenido principal (75%): Grid de vehículos
- Header de página: breadcrumb + title
- Filtros móviles: modal/drawer
```

#### **Filtros Laterales**

```tsx
Filtros a implementar:
- Búsqueda por texto
- Marca (dropdown/checkboxes)
- Rango de precios (slider)
- Año (min/max inputs)
- Combustible (radio/checkboxes)
- Transmisión (radio)
- Tracción (radio)
- Solo destacados (toggle)
- Botón "Limpiar filtros"
```

#### **Grid de Vehículos**

```tsx
- Header: "X vehículos encontrados" + ordenamiento
- Grid responsive: 3-2-1 columnas
- Paginación al final
- Loading states y empty states
- Ordenamiento: precio, año, marca, fecha
```

#### **Card de Vehículo**

```tsx
- Imagen principal (con indicador si hay más)
- Badge "DESTACADO" si aplica
- Nombre del vehículo
- Precio (formato moneda)
- Año, kilometraje, combustible
- CTAs: "Ver detalles" + "Contactar"
- Hover effects
```

### **📞 3. Página de Contacto**

#### **Layout**

```tsx
- 2 columnas desktop: Formulario + Info/Mapa
- 1 columna mobile: Formulario arriba, info abajo
- Header: título + breadcrumb
```

#### **Formulario de Contacto**

```tsx
Campos requeridos:
- Nombre completo*
- Email*
- Teléfono*
- Ciudad*
- Provincia*
- Mensaje/Consulta*
- Checkbox: acepto términos
- Botón: "Enviar consulta"
- Validación en tiempo real
- Estados: loading, success, error
```

#### **Información de Contacto**

```tsx
- Dirección física
- Teléfonos (ventas, servicio, etc.)
- Email de contacto
- Horarios de atención
- Redes sociales
```

#### **Mapa**

```tsx
- Google Maps embebido
- Marker en ubicación de la empresa
- Controles básicos (zoom, street view)
- Responsive
```

### **🔍 4. Detalle de Vehículo**

#### **Galería de Imágenes**

```tsx
- Imagen principal grande
- Thumbnails abajo/lateral
- Modal lightbox para ver en grande
- Navegación con flechas/dots
- Zoom en hover (desktop)
```

#### **Información Principal**

```tsx
- Nombre del vehículo
- Precio destacado
- Especificaciones básicas (año, km, combustible)
- Badge "DESTACADO" si aplica
- Botones CTA: "Contactar por este auto" + "WhatsApp"
```

#### **Especificaciones Completas**

```tsx
Tabs/secciones organizadas:
- Motor (combustible, cilindrada, potencia, etc.)
- Transmisión y Chasis
- Equipamiento y Confort
- Seguridad
- Entretenimiento
- Mostrar solo campos con datos
```

#### **Formulario de Consulta**

```tsx
- Pre-llenado con info del vehículo
- Campos similares a página de contacto
- Mensaje pre-llenado: "Consulta sobre [Nombre Vehículo]"
```

#### **Vehículos Relacionados**

```tsx
- "También te puede interesar"
- 3-4 vehículos similares (misma marca/precio similar)
- Cards simplificadas
```

## 📝 **Validaciones y Formularios**

### **Esquemas de Validación (Zod)**

```typescript
// lib/validations.ts
export const contactSchema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto').max(50),
  apellido: z.string().min(2, 'Apellido muy corto').max(50),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(8, 'Teléfono inválido'),
  ciudad: z.string().min(2, 'Ciudad requerida'),
  provincia: z.string().min(2, 'Provincia requerida'),
  mensaje: z.string().min(10, 'Mensaje muy corto').max(500),
});

export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const vehicleFiltersSchema = z.object({
  search: z.string().optional(),
  marca: z.string().optional(),
  precioMin: z.number().min(0).optional(),
  precioMax: z.number().min(0).optional(),
  anioMin: z.number().min(1990).max(2025).optional(),
  anioMax: z.number().min(1990).max(2025).optional(),
  // ... otros filtros
});
```

## 🎯 **SEO y Performance**

### **SEO Requirements**

```tsx
- Títulos únicos por página
- Meta descriptions descriptivas
- Open Graph tags
- Structured data (JSON-LD) para vehículos
- Sitemap XML
- URLs semánticas
- Alt text en imágenes
- Schema.org markup para LocalBusiness
```

### **Performance Targets**

```
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s
- Core Web Vitals: Green scores
```

## 🔧 **Configuración y Setup**

### **Variables de Entorno**

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_IMAGES_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### **Scripts de Desarrollo**

```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## 📱 **Estados y Interacciones**

### **Loading States**

- Skeleton loaders para cards de vehículos
- Spinners para formularios
- Progressive loading de imágenes
- Lazy loading de componentes pesados

### **Error Handling**

- Página 404 personalizada
- Error boundaries para errores de JS
- Fallbacks para imágenes rotas
- Mensajes de error amigables para API failures
- Rate limiting handling (429 responses)

### **Microinteracciones**

- Hover effects en cards y botones
- Smooth scrolling
- Animaciones de transición suaves
- Loading indicators
- Success/error feedback visual

## 🧪 **Testing y QA**

### **Checklist de Funcionalidad**

- [ ] Navegación completa entre páginas
- [ ] Filtros de vehículos funcionando
- [ ] Paginación operativa
- [ ] Formularios con validación
- [ ] Responsive en todos los breakpoints
- [ ] Carga de imágenes optimizada
- [ ] SEO básico implementado
- [ ] Performance aceptable
- [ ] Accesibilidad básica (a11y)

### **Datos de Prueba**

- Usar vehículos del seed de la API
- Crear 5-10 testimonios fake
- Logos de marcas reales (con derechos)
- Imágenes placeholder para desarrollo

## 🚀 **Entregables**

1. **Sitio web completo** con las 4 páginas principales
2. **Responsive design** mobile-first
3. **Integración completa** con API pública
4. **Formularios funcionales** con validación
5. **SEO básico** implementado
6. **Performance optimizado** para Core Web Vitals
7. **Documentación** de componentes y APIs
8. **README** con instrucciones de setup

## 📈 **Métricas de Éxito**

- **Velocidad**: < 3s tiempo de carga
- **Conversión**: Formularios de contacto funcionales
- **UX**: Navegación intuitiva y fluida
- **SEO**: Indexación correcta en Google
- **Mobile**: 100% funcional en dispositivos móviles

---

**NOTA**: Este es un MVP inicial. Funcionalidades avanzadas como favoritos, comparador, calculadora de crédito, chat online, etc., se implementarán en fases posteriores según necesidades del negocio.
