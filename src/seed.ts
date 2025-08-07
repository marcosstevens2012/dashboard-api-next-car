/**
 * SEEDS DESHABILITADOS
 * Este archivo contiene los seeds de la base de datos, pero están deshabilitados.
 * Para habilitarlos nuevamente:
 * 1. Descomentar el script "db:seed" en package.json
 * 2. Descomentar la tarea en .vscode/tasks.json
 * 3. Descomentar la línea en setup.sh
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { ContactsService } from './contacts/contacts.service';
import { Vehicle } from './entities/vehicle.entity';
import { ImagesService } from './images/images.service';
import { VehiclesService } from './vehicles/vehicles.service';
import { VideosService } from './videos/videos.service';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const authService = app.get(AuthService);
  const vehiclesService = app.get(VehiclesService);
  const contactsService = app.get(ContactsService);
  const imagesService = app.get(ImagesService);
  const videosService = app.get(VideosService);

  try {
    console.log('🌱 Iniciando proceso de seeding...\n');

    // 1. Crear usuario admin por defecto
    await seedUsers(authService);

    // 2. Crear vehículos de ejemplo
    const vehicles = await seedVehicles(vehiclesService);

    // 3. Crear contactos de ejemplo
    await seedContacts(contactsService);

    // 4. Crear imágenes y videos de ejemplo para los vehículos
    await seedMediaForVehicles(vehicles, imagesService, videosService);

    console.log('\n🎉 ¡Seeding completado exitosamente!');
  } catch (error) {
    console.error('❌ Error en el proceso de seed:', error);
  }

  await app.close();
}

async function seedUsers(authService: AuthService) {
  console.log('👤 Seeding usuarios...');

  const existingUsers = await authService.findAllUsers();

  if (existingUsers.length === 0) {
    await authService.createUser('admin', 'dashboard123', 'admin');
    console.log('✅ Usuario admin creado exitosamente');
    console.log('📧 Username: admin');
    console.log('🔑 Password: dashboard123');
    console.log('⚠️  Recuerda cambiar la contraseña en producción');
  } else {
    console.log('ℹ️  Ya existen usuarios en la base de datos');
  }
}

async function seedVehicles(vehiclesService: VehiclesService) {
  console.log('🚗 Seeding vehículos...');

  const vehicleData = [
    {
      nombre: 'Toyota Corolla Cross XEI',
      marca: 'Toyota',
      modelo: 'Corolla Cross',
      tipo: 'suv',
      anio: 2023,
      precio: 25000000,
      descripcion:
        'SUV compacta con excelente rendimiento de combustible y tecnología avanzada. Ideal para la ciudad y aventuras familiares.',
      destacado: true,
      kilometraje: '15000',
      observaciones: 'Vehículo en excelente estado, único dueño',
      combustible: 'Nafta',
      cilindrada: '2000',
      potencia: '169 HP',
      alimentacion: 'Inyección',
      cilindros: 4,
      valvulas: 16,
      traccion: 'Delantera',
      transmision: 'CVT',
      velocidades: 'Automática CVT',
      neumaticos: '215/60R17',
      frenosDelanteros: 'Disco ventilado',
      frenosTraseros: 'Disco',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Eléctrica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      asientosTraseros: '60/40',
      tapizados: 'Tela',
      cierrePuertas: 'Centralizado',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      asistenciaArranquePendientes: true,
      controlEconomiaCombustible: true,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: true,
      airbagsDelanteros: true,
      airbagsCortina: 'Laterales',
      airbagRodillaConductor: false,
      airbagsLaterales: 'Delanteros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 7,
      equipoMusica: 'Pantalla táctil 8"',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      controlVozDispositivos: true,
      pantalla: true,
      sistemaNavegacionGPS: false,
      appleCarPlay: true,
      mirrorlink: false,
    },
    {
      nombre: 'Ford EcoSport Titanium',
      marca: 'Ford',
      modelo: 'EcoSport',
      tipo: 'suv',
      anio: 2022,
      precio: 18500000,
      descripcion:
        'SUV urbana perfecta para la ciudad con diseño moderno y características premium.',
      destacado: false,
      kilometraje: '25000',
      observaciones: 'Mantenimientos al día, excelente estado',
      combustible: 'Nafta',
      cilindrada: '1500',
      potencia: '123 HP',
      alimentacion: 'Inyección directa',
      cilindros: 3,
      valvulas: 12,
      traccion: 'Delantera',
      transmision: 'Manual',
      velocidades: '6 velocidades',
      neumaticos: '205/60R16',
      frenosDelanteros: 'Disco',
      frenosTraseros: 'Tambor',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Hidráulica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      asientosTraseros: 'Fijos',
      tapizados: 'Cuero',
      cierrePuertas: 'Centralizado',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Manuales',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: false,
      asistenciaArranquePendientes: false,
      controlEconomiaCombustible: false,
      luzDiurna: false,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: false,
      airbagsDelanteros: true,
      airbagsCortina: 'No',
      airbagRodillaConductor: false,
      airbagsLaterales: 'No',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: false,
      controlTraccion: false,
      cantidadAirbags: 2,
      equipoMusica: 'Radio AM/FM',
      comandosVolante: false,
      conexionAuxiliar: true,
      conexionUSB: false,
      interfazBluetooth: false,
      controlVozDispositivos: false,
      pantalla: false,
      sistemaNavegacionGPS: false,
      appleCarPlay: false,
      mirrorlink: false,
    },
    {
      nombre: 'Volkswagen Amarok V6',
      marca: 'Volkswagen',
      modelo: 'Amarok',
      tipo: 'pickup',
      anio: 2021,
      precio: 35000000,
      descripcion:
        'Pickup robusta con motor V6 y tracción 4x4. Perfecta para trabajo y aventura.',
      destacado: true,
      kilometraje: '45000',
      observaciones: 'Vehículo de trabajo en muy buen estado',
      combustible: 'Diesel',
      cilindrada: '3000',
      potencia: '258 HP',
      alimentacion: 'Turbo intercooler',
      cilindros: 6,
      valvulas: 24,
      traccion: '4x4',
      transmision: 'Automática',
      velocidades: '8 velocidades',
      neumaticos: '255/60R18',
      frenosDelanteros: 'Disco ventilado',
      frenosTraseros: 'Disco',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Eléctrica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      asientosTraseros: '60/40',
      tapizados: 'Cuero',
      cierrePuertas: 'Centralizado con alarma',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos con calefacción',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      asistenciaArranquePendientes: true,
      controlEconomiaCombustible: true,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: true,
      airbagsDelanteros: true,
      airbagsCortina: 'Laterales',
      airbagRodillaConductor: true,
      airbagsLaterales: 'Delanteros y traseros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 8,
      equipoMusica: 'Pantalla táctil 9.2"',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      controlVozDispositivos: true,
      pantalla: true,
      sistemaNavegacionGPS: true,
      appleCarPlay: true,
      mirrorlink: true,
    },
    {
      nombre: 'Chevrolet Onix Premier',
      marca: 'Chevrolet',
      modelo: 'Onix',
      tipo: 'auto',
      anio: 2024,
      precio: 16800000,
      descripcion:
        'Sedán compacto moderno con la mejor tecnología y eficiencia en combustible.',
      destacado: false,
      kilometraje: '8000',
      observaciones: 'Prácticamente nuevo, garantía vigente',
      combustible: 'Nafta',
      cilindrada: '1000',
      potencia: '116 HP',
      alimentacion: 'Turbo',
      cilindros: 3,
      valvulas: 12,
      traccion: 'Delantera',
      transmision: 'CVT',
      velocidades: 'Automática CVT',
      neumaticos: '185/60R15',
      frenosDelanteros: 'Disco',
      frenosTraseros: 'Tambor',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Eléctrica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      asientosTraseros: 'Fijos',
      tapizados: 'Tela premium',
      cierrePuertas: 'Centralizado',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      asistenciaArranquePendientes: false,
      controlEconomiaCombustible: true,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: false,
      airbagsDelanteros: true,
      airbagsCortina: 'No',
      airbagRodillaConductor: false,
      airbagsLaterales: 'Delanteros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 4,
      equipoMusica: 'MyLink 8"',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      controlVozDispositivos: true,
      pantalla: true,
      sistemaNavegacionGPS: false,
      appleCarPlay: true,
      mirrorlink: false,
    },
    {
      nombre: 'Honda HR-V EXL',
      marca: 'Honda',
      modelo: 'HR-V',
      tipo: 'suv',
      anio: 2023,
      precio: 28000000,
      descripcion:
        'SUV compacta premium con diseño elegante y tecnología Honda Sensing.',
      destacado: true,
      kilometraje: '12000',
      observaciones: 'Impecable, service oficial Honda',
      combustible: 'Nafta',
      cilindrada: '1500',
      potencia: '140 HP',
      alimentacion: 'Inyección directa',
      cilindros: 4,
      valvulas: 16,
      traccion: 'Delantera',
      transmision: 'CVT',
      velocidades: 'Automática CVT',
      neumaticos: '215/55R17',
      frenosDelanteros: 'Disco ventilado',
      frenosTraseros: 'Disco',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Eléctrica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      asientosTraseros: '60/40',
      tapizados: 'Cuero sintético',
      cierrePuertas: 'Centralizado',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      asistenciaArranquePendientes: true,
      controlEconomiaCombustible: true,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: true,
      airbagsDelanteros: true,
      airbagsCortina: 'Laterales',
      airbagRodillaConductor: false,
      airbagsLaterales: 'Delanteros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 6,
      equipoMusica: 'Display Audio 7"',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      controlVozDispositivos: true,
      pantalla: true,
      sistemaNavegacionGPS: false,
      appleCarPlay: true,
      mirrorlink: false,
    },
    {
      nombre: 'Honda CB 600F Hornet',
      marca: 'Honda',
      modelo: 'CB 600F Hornet',
      tipo: 'moto',
      anio: 2023,
      precio: 8500000,
      descripcion:
        'Motocicleta deportiva naked con excelente relación potencia-peso. Ideal para ciudad y ruta.',
      destacado: true,
      kilometraje: '5000',
      observaciones: 'Motocicleta en excelente estado, service al día',
      combustible: 'Nafta',
      cilindrada: '599',
      potencia: '102 HP',
      alimentacion: 'Inyección',
      cilindros: 4,
      valvulas: 16,
      traccion: 'Trasera',
      transmision: 'Manual',
      velocidades: '6 velocidades',
      neumaticos: '120/70 ZR17 - 180/55 ZR17',
      frenosDelanteros: 'Disco doble',
      frenosTraseros: 'Disco simple',
      direccionAsistida: false,
      direccionAsistidaTipo: '',
      aireAcondicionado: false,
      asientoDelanteroAjuste: false,
      volanteRegulable: false,
      asientosTraseros: 'Para pasajero',
      tapizados: 'Sintético',
      cierrePuertas: 'N/A',
      vidriosDelanteros: 'N/A',
      vidriosTraseros: 'N/A',
      espejosExteriores: 'Manuales',
      farosAntiniebla: false,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: false,
      asistenciaArranquePendientes: false,
      controlEconomiaCombustible: false,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: false,
      asistenciaFrenadaEmergencia: false,
      airbagsDelanteros: false,
      airbagsCortina: 'N/A',
      airbagRodillaConductor: false,
      airbagsLaterales: 'N/A',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: false,
      autobloqueoPuertas: false,
      controlEstabilidad: false,
      controlTraccion: false,
      cantidadAirbags: 0,
      equipoMusica: 'N/A',
      comandosVolante: false,
      conexionAuxiliar: false,
      conexionUSB: false,
      interfazBluetooth: false,
      controlVozDispositivos: false,
      pantalla: false,
      sistemaNavegacionGPS: false,
      appleCarPlay: false,
      mirrorlink: false,
    },
    {
      nombre: 'Yamaha MT-07',
      marca: 'Yamaha',
      modelo: 'MT-07',
      tipo: 'moto',
      anio: 2022,
      precio: 7200000,
      descripcion:
        'Motocicleta naked de media cilindrada, perfecta para principiantes avanzados y uso urbano.',
      destacado: false,
      kilometraje: '12000',
      observaciones:
        'Muy bien cuidada, ideal para comenzar en el mundo de las motos',
      combustible: 'Nafta',
      cilindrada: '689',
      potencia: '73 HP',
      alimentacion: 'Inyección',
      cilindros: 2,
      valvulas: 8,
      traccion: 'Trasera',
      transmision: 'Manual',
      velocidades: '6 velocidades',
      neumaticos: '120/70 ZR17 - 180/55 ZR17',
      frenosDelanteros: 'Disco doble',
      frenosTraseros: 'Disco simple',
      direccionAsistida: false,
      direccionAsistidaTipo: '',
      aireAcondicionado: false,
      asientoDelanteroAjuste: false,
      volanteRegulable: false,
      asientosTraseros: 'Para pasajero',
      tapizados: 'Sintético',
      cierrePuertas: 'N/A',
      vidriosDelanteros: 'N/A',
      vidriosTraseros: 'N/A',
      espejosExteriores: 'Manuales',
      farosAntiniebla: false,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: false,
      asistenciaArranquePendientes: false,
      controlEconomiaCombustible: false,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: false,
      asistenciaFrenadaEmergencia: false,
      airbagsDelanteros: false,
      airbagsCortina: 'N/A',
      airbagRodillaConductor: false,
      airbagsLaterales: 'N/A',
      alarma: false,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: false,
      autobloqueoPuertas: false,
      controlEstabilidad: false,
      controlTraccion: false,
      cantidadAirbags: 0,
      equipoMusica: 'N/A',
      comandosVolante: false,
      conexionAuxiliar: false,
      conexionUSB: false,
      interfazBluetooth: false,
      controlVozDispositivos: false,
      pantalla: false,
      sistemaNavegacionGPS: false,
      appleCarPlay: false,
      mirrorlink: false,
    },
  ];

  const createdVehicles: Vehicle[] = [];

  for (const vehicle of vehicleData) {
    try {
      const createdVehicle = await vehiclesService.create(vehicle);
      createdVehicles.push(createdVehicle);
      console.log(`✅ Vehículo creado: ${vehicle.marca} ${vehicle.modelo}`);
    } catch (error) {
      console.error(
        `❌ Error creando vehículo ${vehicle.marca} ${vehicle.modelo}:`,
        error,
      );
    }
  }

  console.log(`✅ ${createdVehicles.length} vehículos creados exitosamente`);
  return createdVehicles;
}

async function seedContacts(contactsService: ContactsService) {
  console.log('📞 Seeding contactos...');

  const contactData = [
    {
      nombre: 'Juan Carlos',
      apellido: 'González',
      ciudad: 'Buenos Aires',
      provincia: 'Buenos Aires',
      telefono: '+54 11 4567-8901',
      email: 'juan.gonzalez@email.com',
      mensaje:
        'Hola, estoy interesado en el Toyota Corolla Cross. ¿Podrían enviarme más información sobre el estado del vehículo y si está disponible para una prueba de manejo? Gracias.',
    },
    {
      nombre: 'María Elena',
      apellido: 'Rodriguez',
      ciudad: 'Córdoba',
      provincia: 'Córdoba',
      telefono: '+54 351 234-5678',
      email: 'maria.rodriguez@email.com',
      mensaje:
        'Buenos días, me interesa la Ford EcoSport Titanium. ¿El precio es negociable? ¿Tiene algún tipo de financiación disponible?',
    },
    {
      nombre: 'Carlos Alberto',
      apellido: 'Mendoza',
      ciudad: 'Mendoza',
      provincia: 'Mendoza',
      telefono: '+54 261 987-6543',
      email: 'carlos.mendoza@email.com',
      mensaje:
        'Hola, trabajo en el campo y me interesa la Amarok V6. ¿Podrían decirme más sobre el mantenimiento que ha tenido y si todos los servicios están al día?',
    },
    {
      nombre: 'Ana Sofía',
      apellido: 'López',
      ciudad: 'Rosario',
      provincia: 'Santa Fe',
      telefono: '+54 341 456-7890',
      email: 'ana.lopez@email.com',
      mensaje:
        'Me gusta mucho el Chevrolet Onix Premier. ¿Es posible coordinar una visita para verlo personalmente? Estoy disponible los fines de semana.',
    },
    {
      nombre: 'Roberto',
      apellido: 'Silva',
      ciudad: 'La Plata',
      provincia: 'Buenos Aires',
      telefono: '+54 221 345-6789',
      email: 'roberto.silva@email.com',
      mensaje:
        '¿El Honda HR-V tiene garantía vigente? Me interesa comprarlo pero necesito saber sobre la cobertura y los términos de garantía.',
    },
    {
      nombre: 'Lucia',
      apellido: 'Fernández',
      ciudad: 'Tucumán',
      provincia: 'Tucumán',
      telefono: '+54 381 567-8901',
      email: 'lucia.fernandez@email.com',
      mensaje:
        'Estoy buscando un vehículo familiar y seguro. ¿Podrían recomendarme cuál de sus vehículos sería el más adecuado para una familia de 4 personas?',
    },
  ];

  for (const contact of contactData) {
    try {
      await contactsService.create(contact);
      console.log(`✅ Contacto creado: ${contact.nombre} ${contact.apellido}`);
    } catch (error) {
      console.error(
        `❌ Error creando contacto ${contact.nombre} ${contact.apellido}:`,
        error,
      );
    }
  }

  console.log(`✅ ${contactData.length} contactos creados exitosamente`);
}

async function seedMediaForVehicles(
  vehicles: Vehicle[],
  imagesService: ImagesService,
  videosService: VideosService,
) {
  console.log('🖼️ Seeding imágenes y videos...');

  // URLs de imágenes de ejemplo (puedes reemplazar con URLs reales)
  const sampleImageUrls = [
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d',
    'https://images.unsplash.com/photo-1471479917193-f00955256257',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98',
  ];

  // URLs de videos de ejemplo
  const sampleVideoUrls = [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  ];

  for (const vehicle of vehicles) {
    try {
      // Crear 2-4 imágenes por vehículo
      const numImages = Math.floor(Math.random() * 3) + 2; // 2-4 imágenes
      for (let i = 0; i < numImages; i++) {
        const imageUrl =
          sampleImageUrls[Math.floor(Math.random() * sampleImageUrls.length)];
        await imagesService.create({
          url: imageUrl,
          vehicleId: vehicle.id,
        });
      }

      // Crear 1-2 videos por vehículo (solo para algunos vehículos)
      if (Math.random() > 0.3) {
        // 70% de probabilidad de tener video
        const numVideos = Math.floor(Math.random() * 2) + 1; // 1-2 videos
        for (let i = 0; i < numVideos; i++) {
          const videoUrl =
            sampleVideoUrls[Math.floor(Math.random() * sampleVideoUrls.length)];
          await videosService.create({
            url: videoUrl,
            vehicleId: vehicle.id,
            filename: `${vehicle.marca}-${vehicle.modelo}-video-${i + 1}.mp4`,
          });
        }
      }

      console.log(`✅ Media creada para: ${vehicle.marca} ${vehicle.modelo}`);
    } catch (error) {
      console.error(
        `❌ Error creando media para ${vehicle.marca} ${vehicle.modelo}:`,
        error,
      );
    }
  }

  console.log('✅ Imágenes y videos creados exitosamente');
}

seed().catch((error) => {
  console.error('❌ Error en el proceso de seed:', error);
  process.exit(1);
});

seed().catch((error) => {
  console.error('❌ Error en el proceso de seed:', error);
  process.exit(1);
});
