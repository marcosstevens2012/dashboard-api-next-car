# 🎨 **NEXTCAR Website - Design System & Components**

## 🎨 **Design System**

### **Color Palette**

```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6; /* Main brand color */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-900: #1e3a8a;

/* Secondary Colors */
--secondary-50: #fefce8;
--secondary-100: #fef3c7;
--secondary-500: #f59e0b; /* Accent/CTA color */
--secondary-600: #d97706;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### **Typography**

```css
/* Font Families */
--font-primary: 'Inter', system-ui, sans-serif;
--font-secondary: 'Poppins', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### **Spacing System**

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### **Border Radius**

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px */
--radius-full: 9999px;
```

### **Shadows**

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## 🧩 **Component Library**

### **Button Components**

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Variants:
// Primary: Blue background, white text
// Secondary: Yellow/orange background, dark text
// Outline: Border only, transparent background
// Ghost: No background, minimal styling
// Link: Text link styling

// Sizes:
// sm: py-2 px-3 text-sm
// md: py-2.5 px-4 text-base
// lg: py-3 px-6 text-lg
// xl: py-4 px-8 text-xl
```

### **Input Components**

```tsx
// components/ui/Input.tsx
interface InputProps {
  type: 'text' | 'email' | 'tel' | 'number' | 'password';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
}

// components/ui/Select.tsx
interface SelectProps {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// components/ui/Textarea.tsx
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
}
```

### **Card Components**

```tsx
// components/ui/Card.tsx
interface CardProps {
  variant: 'default' | 'bordered' | 'shadow' | 'elevated';
  padding: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

// components/vehicles/VehicleCard.tsx
interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (id: string) => void;
  onContact: (id: string) => void;
  showContactButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Structure:
// - Image with overlay for "DESTACADO" badge
// - Vehicle name and basic info
// - Price prominently displayed
// - Key specs (year, km, fuel)
// - Action buttons
```

### **Navigation Components**

```tsx
// components/layout/Header.tsx
interface HeaderProps {
  transparent?: boolean;
  sticky?: boolean;
}

// components/layout/Navigation.tsx
interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavigationItem[];
}

// components/layout/MobileMenu.tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}
```

### **Filter Components**

```tsx
// components/vehicles/FilterSidebar.tsx
interface FilterSidebarProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  filterOptions: FilterOptions;
  onClearFilters: () => void;
  loading?: boolean;
}

// components/vehicles/PriceRangeSlider.tsx
interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue: (value: number) => string;
}

// components/vehicles/FilterCheckboxGroup.tsx
interface FilterCheckboxGroupProps {
  title: string;
  options: Array<{ value: string; label: string; count?: number }>;
  selected: string[];
  onChange: (selected: string[]) => void;
  maxVisible?: number;
  showCounts?: boolean;
}
```

### **Gallery Components**

```tsx
// components/vehicles/VehicleGallery.tsx
interface VehicleGalleryProps {
  images: Image[];
  alt: string;
  onImageClick?: (index: number) => void;
}

// components/ui/ImageLightbox.tsx
interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// components/ui/ImageCarousel.tsx
interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  showThumbnails?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}
```

### **Form Components**

```tsx
// components/contact/ContactForm.tsx
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  initialData?: Partial<ContactFormData>;
  vehicleContext?: {
    id: string;
    name: string;
  };
}

// components/home/NewsletterForm.tsx
interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  variant?: 'default' | 'minimal' | 'hero';
}
```

### **Feedback Components**

```tsx
// components/ui/Alert.tsx
interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

// components/ui/Toast.tsx
interface ToastProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  onClose: () => void;
}

// components/ui/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  overlay?: boolean;
}

// components/ui/Skeleton.tsx
interface SkeletonProps {
  variant: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}
```

## 📱 **Layout Components**

### **Grid Systems**

```tsx
// components/ui/Grid.tsx
interface GridProps {
  cols: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  children: ReactNode;
}

// components/vehicles/VehicleGrid.tsx
interface VehicleGridProps {
  vehicles: Vehicle[];
  loading?: boolean;
  onVehicleClick: (id: string) => void;
  onContactClick: (id: string) => void;
  variant?: 'featured' | 'listing' | 'related';
}
```

### **Container & Sections**

```tsx
// components/ui/Container.tsx
interface ContainerProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  children: ReactNode;
}

// components/ui/Section.tsx
interface SectionProps {
  variant?: 'default' | 'alternate' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  id?: string;
}
```

## 🎭 **Home Page Specific Components**

### **Hero Section**

```tsx
// components/home/HeroBanner.tsx
interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  showSearch?: boolean;
}
```

### **Featured Vehicles**

```tsx
// components/home/FeaturedVehicles.tsx
interface FeaturedVehiclesProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
  variant?: 'carousel' | 'grid';
}
```

### **Client Reviews**

```tsx
// components/home/ClientReviews.tsx
interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  avatar?: string;
  date?: string;
}

interface ClientReviewsProps {
  title?: string;
  subtitle?: string;
  reviews: Review[];
  variant?: 'carousel' | 'grid';
  autoPlay?: boolean;
}
```

### **Brand Logos**

```tsx
// components/home/BrandLogos.tsx
interface Brand {
  name: string;
  logo: string;
  href?: string;
}

interface BrandLogosProps {
  title?: string;
  brands: Brand[];
  variant?: 'grid' | 'carousel';
  grayscale?: boolean;
}
```

### **Stats Section**

```tsx
// components/home/StatsSection.tsx
interface Stat {
  label: string;
  value: string | number;
  icon?: ReactNode;
  suffix?: string;
}

interface StatsSectionProps {
  title?: string;
  stats: Stat[];
  variant?: 'simple' | 'cards' | 'counters';
}
```

## 🗺️ **Map Components**

```tsx
// components/contact/Map.tsx
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title?: string;
    info?: string;
  }>;
  height?: string;
  className?: string;
}

// components/contact/ContactInfo.tsx
interface ContactInfoProps {
  address: {
    street: string;
    city: string;
    province: string;
    zipCode?: string;
  };
  phone: string[];
  email: string[];
  hours: {
    [key: string]: string;
  };
  socialMedia?: {
    platform: string;
    url: string;
    icon: ReactNode;
  }[];
}
```

## 🔍 **Search & Filter Components**

```tsx
// components/search/QuickSearch.tsx
interface QuickSearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  suggestions?: string[];
  variant?: 'simple' | 'advanced';
}

// components/vehicles/VehicleSort.tsx
interface VehicleSortProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}

// components/vehicles/VehiclePagination.tsx
interface VehiclePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  showQuickJumper?: boolean;
}
```

## 📊 **Data Display Components**

```tsx
// components/vehicles/VehicleSpecs.tsx
interface VehicleSpecsProps {
  vehicle: Vehicle;
  variant?: 'compact' | 'detailed' | 'tabs';
  sectionsToShow?: string[];
}

// components/vehicles/VehicleHighlights.tsx
interface VehicleHighlightsProps {
  highlights: string[];
  maxVisible?: number;
  variant?: 'list' | 'badges' | 'grid';
}

// components/ui/Badge.tsx
interface BadgeProps {
  variant:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
}
```

## 🎨 **CSS Classes Utility**

```css
/* Custom utility classes */
.text-gradient {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hover-lift {
  transition: transform 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.image-overlay {
  position: relative;
}

.image-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1));
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 📱 **Responsive Breakpoints**

```css
/* Tailwind CSS breakpoints */
/* sm: 640px and up */
/* md: 768px and up */
/* lg: 1024px and up */
/* xl: 1280px and up */
/* 2xl: 1536px and up */

/* Custom breakpoints if needed */
@media (max-width: 480px) {
  /* Extra small devices */
}

@media (min-width: 1440px) {
  /* Large desktop */
}
```

## 🎯 **Animation & Transitions**

```css
/* Smooth transitions for interactive elements */
.transition-all {
  transition: all 0.2s ease-in-out;
}

.transition-colors {
  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}

/* Loading animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
```

## 🧪 **Component Testing Structure**

```tsx
// __tests__/components/VehicleCard.test.tsx
describe('VehicleCard', () => {
  const mockVehicle = {
    id: '1',
    nombre: 'Toyota Corolla',
    marca: 'Toyota',
    modelo: 'Corolla',
    anio: 2023,
    precio: 25000,
    // ... rest of vehicle data
  };

  test('renders vehicle information correctly', () => {
    // Test implementation
  });

  test('calls onViewDetails when details button is clicked', () => {
    // Test implementation
  });

  test('shows featured badge when vehicle is destacado', () => {
    // Test implementation
  });
});
```

Esta guía de diseño y componentes te dará una base sólida para implementar un sitio web profesional y consistente. Todos los componentes están diseñados para ser reutilizables, accesibles y optimizados para performance.
