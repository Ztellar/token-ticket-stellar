# 🎟️ TokenTicket  

TokenTicket aprovecha la red **Stellar** para revolucionar la industria del ticketing, resolviendo los problemas fundamentales de fraude, especulación y falta de transparencia, otorgando mayor control a los artistas.  

En lugar de un ticket tradicional, cada entrada es un **activo digital único y seguro (token)** en Stellar, lo que permite:  

---

## ✨ Beneficios principales  

- **Fraude y falsificación:**  
  Cada ticket es un token criptográficamente único e imposible de duplicar.  
  Su propiedad y autenticidad son 100% verificables en un libro público e inmutable.  

- **Reventa injusta (scalping):**  
  Los organizadores pueden programar reglas directamente en los tickets (ej. precio máximo de reventa).  
  Parte de esa transacción secundaria se devuelve automáticamente al artista o productor.  

- **Recuperación de ingresos:**  
  Al controlar el mercado secundario, los artistas recuperan comisiones de reventa de manera automática y con costos mínimos, gracias a las microtransacciones de Stellar.  

---

## 🎶 Experiencia para fans  

- Confirmaciones en **3-5 segundos**, ideal para ventas masivas y validación en accesos.  
- **Comisiones de transacción mínimas**, sin las costosas *gas fees*.  
- Tickets con **diseños únicos y coleccionables**, transformados en recuerdos digitales de valor emocional.  
- Beneficios exclusivos vía *airdrops* (ej. meet & greet, merchandising, contenido inédito).  
- **Membresías tokenizadas** para fan clubs, que permiten accesos exclusivos en preventas.  

---

## ⚙️ Tecnologías usadas  

Este proyecto está construido con:  

- [Vite](https://vitejs.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [React](https://react.dev/)  
- [shadcn-ui](https://ui.shadcn.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  

---

## 🚀 Instalación y desarrollo local  

### Requisitos previos  
- Tener **Node.js** y **npm** instalados (se recomienda usar [nvm](https://github.com/nvm-sh/nvm)).  

### Pasos  
```bash
# 1. Clonar el repositorio
git clone <YOUR_GIT_URL>

# 2. Entrar al directorio del proyecto
cd <YOUR_PROJECT_NAME>

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

---

## 🌐 Deploy en Vercel

Este proyecto está listo para ser desplegado en **Vercel** con solo unos clics.

### Opción 1: Deploy con un click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ztellar/token-ticket-stellar)

### Opción 2: Deploy manual desde GitHub

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta o inicia sesión
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite
5. Las configuraciones de build ya están establecidas en `vercel.json`:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Haz clic en **"Deploy"**

### Opción 3: Deploy desde la CLI de Vercel

```bash
# 1. Instalar Vercel CLI globalmente
npm i -g vercel

# 2. Desde el directorio del proyecto, ejecutar
vercel

# 3. Seguir las instrucciones en pantalla
# 4. Para producción, ejecutar
vercel --prod
```

### Variables de entorno (si es necesario)

Si tu aplicación requiere variables de entorno, puedes configurarlas en:
- **Vercel Dashboard** → Tu Proyecto → Settings → Environment Variables

---

## 📝 Notas sobre el deploy

- El archivo `vercel.json` ya está configurado para manejar el enrutamiento SPA correctamente
- Todas las rutas (`/`, `/events`, `/event/:id`, `/dashboard`) funcionarán correctamente en producción
- El proyecto usa Stellar Testnet, asegúrate de actualizar a Mainnet en producción si es necesario

