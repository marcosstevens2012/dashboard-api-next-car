# Ejemplos de Uso de la API - NEXTCAR Dashboard

## 🔧 Configuración Base

```typescript
// api.config.ts
export const API_BASE_URL = 'http://localhost:3001';

// axios instance
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Para upload de archivos
export const apiFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

## 🚗 Ejemplos de Vehículos

### Obtener todos los vehículos

```typescript
// GET /vehicles
const getVehicles = async () => {
  try {
    const response = await api.get('/vehicles');
    return response.data;
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    throw error;
  }
};

// Respuesta esperada:
[
  {
    id: 'clz123abc456',
    nombre: 'Toyota Corolla XEI',
    marca: 'Toyota',
    modelo: 'Corolla',
    anio: 2023,
    precio: 25000,
    descripcion: 'Sedán compacto con excelente rendimiento en combustible',
    destacado: true,
    kilometraje: '15.000 km',
    combustible: 'Nafta',
    transmision: 'Automática',
    aireAcondicionado: true,
    abs: true,
    images: [
      {
        id: 'img123',
        url: '/uploads/vehicle-1234567890.jpg',
        vehicleId: 'clz123abc456',
        createdAt: '2024-01-15T10:30:00.000Z',
      },
    ],
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
  },
];
```

### Crear un vehículo nuevo

```typescript
// POST /vehicles
const createVehicle = async (vehicleData: CreateVehicleDto) => {
  try {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    throw error;
  }
};

// Ejemplo de datos para crear un vehículo:
const newVehicle = {
  nombre: 'Ford Focus Titanium',
  marca: 'Ford',
  modelo: 'Focus',
  anio: 2022,
  precio: 22000,
  descripcion: 'Hatchback premium con tecnología avanzada',
  destacado: false,

  // Información adicional
  kilometraje: '25.000 km',
  observaciones: 'Único dueño, service al día',

  // Motor
  combustible: 'Nafta',
  cilindrada: '2.0',
  potencia: '170 CV',
  alimentacion: 'Inyección Electrónica',
  cilindros: 4,
  valvulas: 16,

  // Transmisión
  traccion: '4X2',
  transmision: 'Automática',
  velocidades: 'Caja de Sexta',
  neumaticos: 'R17',
  frenosDelanteros: 'Discos ventilados',
  frenosTraseros: 'Discos sólidos',
  direccionAsistida: true,
  direccionAsistidaTipo: 'Eléctrica',

  // Confort
  aireAcondicionado: true,
  asientoDelanteroAjuste: true,
  volanteRegulable: true,
  asientosTraseros: 'Abatibles 60/40',
  tapizados: 'Cuero',
  cierrePuertas: 'Centralizado con mando',
  vidriosDelanteros: 'Eléctricos',
  vidriosTraseros: 'Eléctricos',
  espejosExteriores: 'Eléctricos plegables',
  farosAntiniebla: true,
  computadoraBordo: true,
  llantasAleacion: true,
  camaraEstacionamiento: true,

  // Seguridad
  abs: true,
  distribucionElectronicaFrenado: true,
  asistenciaFrenadaEmergencia: true,
  airbagsDelanteros: true,
  airbagsCortina: 'Completos',
  airbagRodillaConductor: true,
  airbagsLaterales: 'Delanteros',
  alarma: true,
  inmovilizadorMotor: true,
  controlEstabilidad: true,
  controlTraccion: true,
  cantidadAirbags: 6,

  // Entretenimiento
  equipoMusica: 'CD/MP3/Radio',
  comandosVolante: true,
  conexionAuxiliar: true,
  conexionUSB: true,
  interfazBluetooth: true,
  pantalla: true,
  sistemaNavegacionGPS: true,
  appleCarPlay: true,
};

await createVehicle(newVehicle);
```

### Actualizar un vehículo

```typescript
// PATCH /vehicles/:id
const updateVehicle = async (id: string, updates: UpdateVehicleDto) => {
  try {
    const response = await api.patch(`/vehicles/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar vehículo:', error);
    throw error;
  }
};

// Ejemplo: Actualizar solo algunos campos
await updateVehicle('clz123abc456', {
  precio: 23000,
  destacado: true,
  observaciones: 'Precio negociable',
});
```

### Destacar/quitar destaque de un vehículo

```typescript
// PATCH /vehicles/:id/highlight
const highlightVehicle = async (id: string, destacado: boolean) => {
  try {
    const response = await api.patch(`/vehicles/${id}/highlight`, {
      destacado,
    });
    return response.data;
  } catch (error) {
    console.error('Error al destacar vehículo:', error);
    throw error;
  }
};

// Destacar vehículo
await highlightVehicle('clz123abc456', true);

// Quitar destaque
await highlightVehicle('clz123abc456', false);
```

### Subir imágenes a un vehículo

```typescript
// POST /vehicles/:id/images
const uploadVehicleImages = async (vehicleId: string, files: FileList) => {
  try {
    const formData = new FormData();

    // Agregar archivos al FormData
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiFormData.post(
      `/vehicles/${vehicleId}/images`,
      formData,
    );
    return response.data;
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    throw error;
  }
};

// Ejemplo de uso en React
const handleImageUpload = async (
  vehicleId: string,
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    try {
      const uploadedImages = await uploadVehicleImages(vehicleId, files);
      console.log('Imágenes subidas:', uploadedImages);
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
```

### Eliminar un vehículo

```typescript
// DELETE /vehicles/:id
const deleteVehicle = async (id: string) => {
  try {
    await api.delete(`/vehicles/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar vehículo:', error);
    throw error;
  }
};

await deleteVehicle('clz123abc456');
```

## 📸 Ejemplos de Imágenes

### Obtener todas las imágenes

```typescript
// GET /images
const getAllImages = async () => {
  try {
    const response = await api.get('/images');
    return response.data;
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    throw error;
  }
};
```

### Eliminar una imagen

```typescript
// DELETE /images/:id
const deleteImage = async (imageId: string) => {
  try {
    await api.delete(`/images/${imageId}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    throw error;
  }
};

await deleteImage('img123');
```

## 📞 Ejemplos de Contactos

### Obtener todos los contactos

```typescript
// GET /contacts
const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    throw error;
  }
};

// Respuesta esperada:
[
  {
    id: 'contact123',
    nombre: 'Juan',
    apellido: 'Pérez',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    telefono: '+54 11 1234-5678',
    email: 'juan.perez@email.com',
    mensaje:
      'Estoy interesado en el Toyota Corolla XEI. ¿Podrían enviarme más información sobre el financiamiento?',
    creadoEn: '2024-01-15T14:30:00.000Z',
  },
];
```

### Crear un nuevo contacto

```typescript
// POST /contacts
const createContact = async (contactData: CreateContactDto) => {
  try {
    const response = await api.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    console.error('Error al crear contacto:', error);
    throw error;
  }
};

// Ejemplo de datos para crear un contacto:
const newContact = {
  nombre: 'María',
  apellido: 'González',
  ciudad: 'Córdoba',
  provincia: 'Córdoba',
  telefono: '+54 351 123-4567',
  email: 'maria.gonzalez@email.com',
  mensaje:
    'Me interesa el Ford Focus. ¿Está disponible para una prueba de manejo?',
};

await createContact(newContact);
```

### Eliminar un contacto

```typescript
// DELETE /contacts/:id
const deleteContact = async (id: string) => {
  try {
    await api.delete(`/contacts/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    throw error;
  }
};

await deleteContact('contact123');
```

## 🛠️ Componentes React Ejemplo

### Hook personalizado para vehículos

```typescript
// hooks/useVehicles.ts
import { useState, useEffect } from 'react';
import { api } from '../api/config';

interface Vehicle {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string;
  destacado: boolean;
  images: Array<{
    id: string;
    url: string;
  }>;
  // ... otros campos
}

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/vehicles');
      setVehicles(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar vehículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createVehicle = async (vehicleData: any) => {
    try {
      const response = await api.post('/vehicles', vehicleData);
      setVehicles((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateVehicle = async (id: string, updates: any) => {
    try {
      const response = await api.patch(`/vehicles/${id}`, updates);
      setVehicles((prev) =>
        prev.map((vehicle) => (vehicle.id === id ? response.data : vehicle)),
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      await api.delete(`/vehicles/${id}`);
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const highlightVehicle = async (id: string, destacado: boolean) => {
    try {
      const response = await api.patch(`/vehicles/${id}/highlight`, {
        destacado,
      });
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === id ? { ...vehicle, destacado } : vehicle,
        ),
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    highlightVehicle,
  };
};
```

### Componente de lista de vehículos

```typescript
// components/VehicleList.tsx
import React, { useState } from 'react';
import { useVehicles } from '../hooks/useVehicles';

const VehicleList: React.FC = () => {
  const { vehicles, loading, error, deleteVehicle, highlightVehicle } = useVehicles();
  const [filter, setFilter] = useState('');

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    vehicle.marca.toLowerCase().includes(filter.toLowerCase()) ||
    vehicle.modelo.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      try {
        await deleteVehicle(id);
      } catch (error) {
        alert('Error al eliminar el vehículo');
      }
    }
  };

  const handleHighlight = async (id: string, currentHighlight: boolean) => {
    try {
      await highlightVehicle(id, !currentHighlight);
    } catch (error) {
      alert('Error al cambiar el estado destacado');
    }
  };

  if (loading) return <div>Cargando vehículos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar vehículos..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {vehicle.images.length > 0 && (
              <img
                src={`http://localhost:3000${vehicle.images[0].url}`}
                alt={vehicle.nombre}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{vehicle.nombre}</h3>
                {vehicle.destacado && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Destacado
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-2">
                {vehicle.marca} {vehicle.modelo} {vehicle.anio}
              </p>

              <p className="text-xl font-bold text-green-600 mb-3">
                ${vehicle.precio.toLocaleString()}
              </p>

              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {vehicle.descripcion}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleHighlight(vehicle.id, vehicle.destacado)}
                  className={`flex-1 py-2 px-3 rounded text-sm ${
                    vehicle.destacado
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {vehicle.destacado ? 'Quitar destaque' : 'Destacar'}
                </button>

                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
```

### Componente de formulario de vehículo

```typescript
// components/VehicleForm.tsx
import React, { useState } from 'react';
import { useVehicles } from '../hooks/useVehicles';

interface VehicleFormProps {
  onSuccess?: () => void;
  vehicleToEdit?: any;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onSuccess, vehicleToEdit }) => {
  const { createVehicle, updateVehicle } = useVehicles();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Información básica
    nombre: vehicleToEdit?.nombre || '',
    marca: vehicleToEdit?.marca || '',
    modelo: vehicleToEdit?.modelo || '',
    anio: vehicleToEdit?.anio || new Date().getFullYear(),
    precio: vehicleToEdit?.precio || 0,
    descripcion: vehicleToEdit?.descripcion || '',
    destacado: vehicleToEdit?.destacado || false,

    // Motor
    combustible: vehicleToEdit?.combustible || '',
    cilindrada: vehicleToEdit?.cilindrada || '',
    potencia: vehicleToEdit?.potencia || '',
    transmision: vehicleToEdit?.transmision || '',

    // Confort
    aireAcondicionado: vehicleToEdit?.aireAcondicionado || false,
    abs: vehicleToEdit?.abs || false,
    // ... más campos
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (vehicleToEdit) {
        await updateVehicle(vehicleToEdit.id, formData);
      } else {
        await createVehicle(formData);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      alert('Error al guardar el vehículo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'motor', label: 'Motor' },
    { id: 'comfort', label: 'Confort' },
    { id: 'safety', label: 'Seguridad' },
    { id: 'entertainment', label: 'Entretenimiento' },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Información Básica */}
      {activeTab === 'basic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marca *
            </label>
            <input
              type="text"
              required
              value={formData.marca}
              onChange={(e) => handleChange('marca', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo *
            </label>
            <input
              type="text"
              required
              value={formData.modelo}
              onChange={(e) => handleChange('modelo', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año *
            </label>
            <input
              type="number"
              required
              min="1900"
              value={formData.anio}
              onChange={(e) => handleChange('anio', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.precio}
              onChange={(e) => handleChange('precio', parseFloat(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              required
              rows={4}
              value={formData.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.destacado}
                onChange={(e) => handleChange('destacado', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Destacado</span>
            </label>
          </div>
        </div>
      )}

      {/* Motor */}
      {activeTab === 'motor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Combustible
            </label>
            <select
              value={formData.combustible}
              onChange={(e) => handleChange('combustible', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Seleccionar...</option>
              <option value="Nafta">Nafta</option>
              <option value="Diesel">Diesel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmisión
            </label>
            <select
              value={formData.transmision}
              onChange={(e) => handleChange('transmision', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Seleccionar...</option>
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          {/* Más campos del motor... */}
        </div>
      )}

      {/* Confort */}
      {activeTab === 'comfort' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.aireAcondicionado}
                onChange={(e) => handleChange('aireAcondicionado', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Aire Acondicionado</span>
            </label>
          </div>

          {/* Más campos de confort... */}
        </div>
      )}

      {/* Botones */}
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Guardando...' : (vehicleToEdit ? 'Actualizar' : 'Crear')} Vehículo
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
```

## 🔗 URLs de Archivos Estáticos

Para mostrar las imágenes en el frontend:

```typescript
// utils/imageUtils.ts
export const getImageUrl = (imagePath: string) => {
  return `http://localhost:3000${imagePath}`;
};

// Ejemplo de uso:
const ImageComponent = ({ image }: { image: { url: string } }) => (
  <img
    src={getImageUrl(image.url)}
    alt="Vehicle"
    className="w-full h-auto"
  />
);
```

Este archivo proporciona ejemplos completos y prácticos de cómo consumir la API desde el frontend, incluyendo hooks personalizados, componentes React y manejo de errores.
