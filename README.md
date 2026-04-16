# Despliegue automático en Vercel

Este repositorio ya está conectado con Vercel. Para dejar el **despliegue automático** correctamente configurado, sigue estos pasos:

## 1) Verifica la conexión del repositorio

1. Entra a [Vercel Dashboard](https://vercel.com/dashboard).
2. Abre tu proyecto.
3. Ve a **Settings → Git**.
4. Confirma que el repositorio y la rama de producción (normalmente `main`) sean correctos.

## 2) Configura producción y previews automáticos

En **Settings → Git** revisa:

- **Production Branch**: `main` (o la rama que uses para producción).
- **Automatically expose System Environment Variables**: recomendado activado.
- **Deploy Hooks** (opcional): útil si quieres disparar despliegues desde otro sistema.

Comportamiento esperado:

- Cada push a `main` => **Production Deployment** automático.
- Cada pull request o push a otras ramas => **Preview Deployment** automático.

## 3) Variables de entorno

1. Ve a **Settings → Environment Variables**.
2. Crea las variables necesarias para:
   - `Production`
   - `Preview`
   - `Development` (si aplica)
3. Guarda cambios y vuelve a desplegar si Vercel lo solicita.

> Si falta una variable en `Preview` o `Production`, el build puede fallar aunque en local funcione.

## 4) Validar el flujo completo

1. Haz un commit en una rama nueva.
2. Sube los cambios (`git push`).
3. Crea un PR.
4. Verifica que Vercel cree un **Preview Deployment**.
5. Haz merge a `main`.
6. Verifica que Vercel cree un **Production Deployment**.

## 5) (Opcional) Protección para producción

En **Settings → Git** puedes activar reglas para evitar despliegues accidentales, por ejemplo:

- Requerir que el build de PR esté en verde antes de merge.
- Restringir quién puede promover despliegues a producción.

## Checklist rápido

- [ ] Repo conectado en **Settings → Git**.
- [ ] Rama de producción correcta (`main` u otra).
- [ ] Variables de entorno configuradas por ambiente.
- [ ] PR genera Preview Deployment.
- [ ] Merge a producción genera Production Deployment.

---

Si quieres, en el siguiente paso te puedo ayudar a dejar un `vercel.json` específico para tu stack (Next.js, Vite, Node, etc.) y validar comandos de build/output para que el pipeline quede cerrado de punta a punta.
