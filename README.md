# AppCodex (Angular + móvil)

Estructura inicial de aplicación Angular con una pantalla principal que muestra **"Hola"**.

## Requisitos

- Node.js 20+
- npm 10+

## Ejecutar en web

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Compatibilidad móvil con Capacitor

1. Genera el build web:
   ```bash
   npm run build
   ```
2. Inicializa plataformas (la primera vez):
   ```bash
   npx cap add android
   npx cap add ios
   ```
3. Sincroniza cambios:
   ```bash
   npx cap sync
   ```
4. Abre proyecto nativo:
   ```bash
   npx cap open android
   npx cap open ios
   ```
