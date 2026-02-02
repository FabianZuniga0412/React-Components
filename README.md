# Portafolio - Fabian Zuniga

Portafolio profesional desarrollado con React, TypeScript y Vite, demostrando habilidades en desarrollo frontend moderno, arquitectura de componentes reutilizables y integración de APIs.

## 🚀 Tecnologías

- **React 19** - Framework UI con hooks modernos
- **TypeScript** - Tipado estático para código robusto
- **Vite** - Build tool de próxima generación
- **Tailwind CSS** - Estilos utility-first
- **Vercel** - Deploy y serverless functions

## ✨ Características

### Componentes UI Reutilizables
- **Music Card** - Componente interactivo con gradientes dinámicos
- **KPI Cards** - Gráficos de líneas y barras con Chart.js
- **Device Status Cards** - Indicadores de estado con animaciones
- **Controlled Form** - Formulario con validación en tiempo real
- **Toast Notifications** - Sistema de notificaciones personalizable
- **Weather Component** - Integración con API externa usando serverless functions

### Arquitectura
- Componentes modulares y reutilizables
- TypeScript para type safety
- Hooks personalizados para lógica compartida
- Manejo de estado con React hooks
- Integración con APIs externas
- Serverless functions para seguridad de API keys

## 🛠️ Desarrollo Local

### Opción 1: Desarrollo con Vite (solo frontend)
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Opción 2: Desarrollo completo con Vercel CLI (recomendado)
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Iniciar entorno de desarrollo de Vercel (simula producción)
vercel dev

# Esto ejecutará tanto el frontend como las serverless functions
```

### Build y Preview
```bash
# Build para producción
npm run build

# Preview del build local
npm run preview
```

## 📦 Despliegue en Vercel

Este proyecto está optimizado para Vercel:

1. **Conecta tu repositorio** en [vercel.com](https://vercel.com)
2. **Configura variables de entorno**:
   - `WEATHER_API_KEY` - Tu API key de WeatherAPI
3. **Deploy automático** - Vercel detectará la configuración automáticamente

### Configuración de Vercel

El proyecto incluye `vercel.json` con:
- Serverless functions para el proxy de Weather API
- Rewrites para SPA routing
- Configuración de build optimizada

## 🔒 Seguridad

- API keys protegidas en serverless functions
- Variables de entorno seguras en Vercel
- CORS configurado correctamente
- Validación de datos en el cliente y servidor

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Form/           # Sistema de formularios
│   ├── Weather.tsx     # Integración con API
│   └── ...
├── config/             # Configuraciones
└── assets/            # Recursos estáticos

api/
└── weather.js         # Serverless function (Vercel)
```

## 🎯 Habilidades Demostradas

- ✅ Arquitectura de componentes escalable
- ✅ TypeScript avanzado
- ✅ Integración de APIs externas
- ✅ Serverless functions
- ✅ Optimización de performance
- ✅ Responsive design
- ✅ Accesibilidad
- ✅ Manejo de estado complejo
- ✅ Validación de formularios
- ✅ Animaciones y transiciones

## 📄 Licencia

Este proyecto es parte de mi portafolio personal.
