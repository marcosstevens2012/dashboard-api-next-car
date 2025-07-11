// types/api.ts - Tipos TypeScript para el Frontend NEXTCAR Dashboard

// ==================== VEHÍCULOS ====================

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

  // Información básica adicional
  kilometraje?: string;
  observaciones?: string;

  // Motor
  combustible?: string;
  cilindrada?: string;
  potencia?: string;
  alimentacion?: string;
  cilindros?: number;
  valvulas?: number;

  // Transmisión y chasis
  traccion?: string;
  transmision?: string;
  velocidades?: string;
  neumaticos?: string;
  frenosDelanteros?: string;
  frenosTraseros?: string;
  direccionAsistida?: boolean;
  direccionAsistidaTipo?: string;

  // Equipamiento - Confort
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

  // Equipamiento - Seguridad
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

  // Comunicación y entretenimiento
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

  // Relaciones
  images: Image[];
}

export interface CreateVehicleDto {
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string;
  destacado?: boolean;

  // Información básica adicional
  kilometraje?: string;
  observaciones?: string;

  // Motor
  combustible?: string;
  cilindrada?: string;
  potencia?: string;
  alimentacion?: string;
  cilindros?: number;
  valvulas?: number;

  // Transmisión y chasis
  traccion?: string;
  transmision?: string;
  velocidades?: string;
  neumaticos?: string;
  frenosDelanteros?: string;
  frenosTraseros?: string;
  direccionAsistida?: boolean;
  direccionAsistidaTipo?: string;

  // Equipamiento - Confort
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

  // Equipamiento - Seguridad
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

  // Comunicación y entretenimiento
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
}

export type UpdateVehicleDto = Partial<CreateVehicleDto>;

export interface HighlightVehicleDto {
  destacado: boolean;
}

// ==================== IMÁGENES ====================

export interface Image {
  id: string;
  url: string;
  vehicleId: string;
  createdAt: string;
  vehicle?: Vehicle;
}

export interface CreateImageDto {
  url: string;
  vehicleId: string;
}

// ==================== CONTACTOS ====================

export interface Contact {
  id: string;
  nombre: string;
  apellido: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  email: string;
  mensaje: string;
  creadoEn: string;
}

export interface CreateContactDto {
  nombre: string;
  apellido: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  email: string;
  mensaje: string;
}

// ==================== RESPUESTAS DE API ====================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==================== FILTROS Y BÚSQUEDA ====================

export interface VehicleFilters {
  marca?: string;
  modelo?: string;
  anioMin?: number;
  anioMax?: number;
  precioMin?: number;
  precioMax?: number;
  destacado?: boolean;
  combustible?: string;
  transmision?: string;
  search?: string;
}

export interface ContactFilters {
  provincia?: string;
  ciudad?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  search?: string;
}

// ==================== OPCIONES DE SELECT ====================

export interface SelectOption {
  value: string;
  label: string;
}

// Opciones predefinidas para los selects
export const COMBUSTIBLE_OPTIONS: SelectOption[] = [
  { value: 'Nafta', label: 'Nafta' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Híbrido', label: 'Híbrido' },
  { value: 'Eléctrico', label: 'Eléctrico' },
];

export const TRANSMISION_OPTIONS: SelectOption[] = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automática', label: 'Automática' },
  { value: 'CVT', label: 'CVT' },
];

export const TRACCION_OPTIONS: SelectOption[] = [
  { value: '4X2', label: '4X2' },
  { value: '4X4', label: '4X4' },
];

export const DIRECCION_ASISTIDA_TIPO_OPTIONS: SelectOption[] = [
  { value: 'Hidráulica', label: 'Hidráulica' },
  { value: 'Eléctrica', label: 'Eléctrica' },
];

export const TAPIZADOS_OPTIONS: SelectOption[] = [
  { value: 'Tela', label: 'Tela' },
  { value: 'Cuero', label: 'Cuero' },
  { value: 'Símil cuero', label: 'Símil cuero' },
  { value: 'Alcántara', label: 'Alcántara' },
];

export const VIDRIOS_OPTIONS: SelectOption[] = [
  { value: 'Manuales', label: 'Manuales' },
  { value: 'Eléctricos', label: 'Eléctricos' },
];

export const ESPEJOS_OPTIONS: SelectOption[] = [
  { value: 'Manuales', label: 'Manuales' },
  { value: 'Eléctricos', label: 'Eléctricos' },
  { value: 'Eléctricos plegables', label: 'Eléctricos plegables' },
];

export const AIRBAGS_CORTINA_OPTIONS: SelectOption[] = [
  { value: 'Delanteros', label: 'Delanteros' },
  { value: 'Traseros', label: 'Traseros' },
  { value: 'Completos', label: 'Completos' },
];

export const AIRBAGS_LATERALES_OPTIONS: SelectOption[] = [
  { value: 'Delanteros', label: 'Delanteros' },
  { value: 'Traseros', label: 'Traseros' },
  { value: 'Completos', label: 'Completos' },
];

export const MARCAS_POPULARES: SelectOption[] = [
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Volkswagen', label: 'Volkswagen' },
  { value: 'Peugeot', label: 'Peugeot' },
  { value: 'Renault', label: 'Renault' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Nissan', label: 'Nissan' },
  { value: 'Honda', label: 'Honda' },
  { value: 'Hyundai', label: 'Hyundai' },
  { value: 'Citroën', label: 'Citroën' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
  { value: 'Audi', label: 'Audi' },
];

export const PROVINCIAS_ARGENTINA: SelectOption[] = [
  { value: 'Buenos Aires', label: 'Buenos Aires' },
  { value: 'CABA', label: 'Ciudad Autónoma de Buenos Aires' },
  { value: 'Catamarca', label: 'Catamarca' },
  { value: 'Chaco', label: 'Chaco' },
  { value: 'Chubut', label: 'Chubut' },
  { value: 'Córdoba', label: 'Córdoba' },
  { value: 'Corrientes', label: 'Corrientes' },
  { value: 'Entre Ríos', label: 'Entre Ríos' },
  { value: 'Formosa', label: 'Formosa' },
  { value: 'Jujuy', label: 'Jujuy' },
  { value: 'La Pampa', label: 'La Pampa' },
  { value: 'La Rioja', label: 'La Rioja' },
  { value: 'Mendoza', label: 'Mendoza' },
  { value: 'Misiones', label: 'Misiones' },
  { value: 'Neuquén', label: 'Neuquén' },
  { value: 'Río Negro', label: 'Río Negro' },
  { value: 'Salta', label: 'Salta' },
  { value: 'San Juan', label: 'San Juan' },
  { value: 'San Luis', label: 'San Luis' },
  { value: 'Santa Cruz', label: 'Santa Cruz' },
  { value: 'Santa Fe', label: 'Santa Fe' },
  { value: 'Santiago del Estero', label: 'Santiago del Estero' },
  { value: 'Tierra del Fuego', label: 'Tierra del Fuego' },
  { value: 'Tucumán', label: 'Tucumán' },
];

// ==================== FORMULARIOS ====================

export interface VehicleFormData extends CreateVehicleDto {
  images?: File[];
}

export interface VehicleFormErrors {
  [key: string]: string;
}

export type ContactFormData = CreateContactDto;

export interface ContactFormErrors {
  [key: string]: string;
}

// ==================== ESTADO DE COMPONENTES ====================

export interface VehicleListState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  filters: VehicleFilters;
  sortBy: 'nombre' | 'marca' | 'precio' | 'anio' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
  total: number;
}

export interface ContactListState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  filters: ContactFilters;
  sortBy: 'creadoEn' | 'nombre' | 'apellido';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
  total: number;
}

// ==================== HOOKS ====================

export interface UseVehiclesReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  createVehicle: (data: CreateVehicleDto) => Promise<Vehicle>;
  updateVehicle: (id: string, data: UpdateVehicleDto) => Promise<Vehicle>;
  deleteVehicle: (id: string) => Promise<void>;
  highlightVehicle: (id: string, destacado: boolean) => Promise<Vehicle>;
  uploadImages: (vehicleId: string, files: FileList) => Promise<Image[]>;
}

export interface UseContactsReturn {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
  createContact: (data: CreateContactDto) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
}

export interface UseImagesReturn {
  images: Image[];
  loading: boolean;
  error: string | null;
  fetchImages: () => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
}

// ==================== UTILIDADES ====================

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ImageUploadState {
  uploading: boolean;
  progress: UploadProgress;
  error: string | null;
}

// ==================== DASHBOARD ====================

export interface DashboardStats {
  totalVehicles: number;
  featuredVehicles: number;
  totalContacts: number;
  recentContacts: number;
  averagePrice: number;
  vehiclesByBrand: Record<string, number>;
  vehiclesByYear: Record<string, number>;
  contactsByMonth: Record<string, number>;
}

// ==================== CONFIGURACIÓN ====================

export interface AppConfig {
  apiBaseUrl: string;
  itemsPerPage: number;
  maxFileSize: number;
  allowedFileTypes: string[];
  maxImagesPerVehicle: number;
}

// ==================== CONSTANTES ====================

export const DEFAULT_VEHICLE_FILTERS: VehicleFilters = {
  search: '',
  marca: '',
  modelo: '',
  destacado: undefined,
  combustible: '',
  transmision: '',
};

export const DEFAULT_CONTACT_FILTERS: ContactFilters = {
  search: '',
  provincia: '',
  ciudad: '',
};

export const SORT_OPTIONS = {
  VEHICLES: [
    { value: 'nombre', label: 'Nombre' },
    { value: 'marca', label: 'Marca' },
    { value: 'precio', label: 'Precio' },
    { value: 'anio', label: 'Año' },
    { value: 'createdAt', label: 'Fecha de creación' },
  ],
  CONTACTS: [
    { value: 'creadoEn', label: 'Fecha' },
    { value: 'nombre', label: 'Nombre' },
    { value: 'apellido', label: 'Apellido' },
  ],
};

export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

// ==================== RUTAS ====================

export const ROUTES = {
  DASHBOARD: '/',
  VEHICLES: '/vehicles',
  VEHICLE_CREATE: '/vehicles/create',
  VEHICLE_EDIT: '/vehicles/edit/:id',
  VEHICLE_DETAIL: '/vehicles/:id',
  CONTACTS: '/contacts',
  CONTACT_DETAIL: '/contacts/:id',
  IMAGES: '/images',
  SETTINGS: '/settings',
} as const;

export type RouteKeys = keyof typeof ROUTES;
