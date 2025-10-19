
# Coctelería Sabor Emilia - E-commerce

Sitio web e-commerce completo para Coctelería Sabor Emilia, especialistas en canapés, mini quiches, mini empanadas y petit fours dulces en Villa Alemana, Chile.

## 🚀 Características

### Sitio Web Público
- **Homepage atractiva** con hero section, categorías, productos destacados y testimonios
- **Catálogo completo** con filtros por categoría y búsqueda
- **Páginas de producto** con detalles, imágenes y funcionalidad de carrito
- **Sistema de carrito** persistente con gestión de cantidades
- **Checkout integrado** con MercadoPago para pagos seguros
- **Formulario de contacto** funcional con guardado en base de datos
- **Páginas de pago** (éxito, fallo, pendiente) con seguimiento de pedidos
- **Diseño responsive** optimizado para móviles y escritorio

### Panel de Administración
- **Dashboard** con estadísticas de ventas y pedidos
- **Gestión de productos** (crear, editar, eliminar)
- **Administración de pedidos** con seguimiento de estados
- **Visualización de consultas** de contacto
- **Configuración del sistema** y tarifas de envío

### Funcionalidades Técnicas
- **Base de datos PostgreSQL** con Prisma ORM
- **Autenticación segura** con NextAuth.js
- **Integración MercadoPago** para procesamiento de pagos
- **Almacenamiento en la nube** para imágenes con AWS S3
- **API RESTful** completa para todas las operaciones
- **Sistema de webhooks** para actualización de estados de pago

## 🛠 Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Base de datos**: PostgreSQL con Prisma
- **Autenticación**: NextAuth.js v4
- **Estilos**: Tailwind CSS + shadcn/ui
- **Pagos**: MercadoPago Checkout Pro
- **Animaciones**: Framer Motion
- **Almacenamiento**: AWS S3
- **Hosting**: DeepAgent (ready-to-deploy)

## 📦 Instalación y Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env` y configura las variables:

```env
# Base de datos (ya configurada automáticamente)
DATABASE_URL="postgresql://..."

# NextAuth (ya configurado)
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# MercadoPago (credenciales TEST incluidas)
MP_PUBLIC_KEY="TEST-d7d6ac2d-7b44-440a-8e83-68e7093c690d"
MP_ACCESS_TOKEN="TEST-1760176808183767-101501-778a84c13dbad1cb06bedf978dd5ecaa-247211893"

# AWS S3 (ya configurado)
AWS_BUCKET_NAME="..."
AWS_FOLDER_PREFIX="cocteleria-sabor-emilia/"

# Email de contacto
CONTACT_EMAIL="contacto.cocteleria.saboremilia@gmail.com"
```

### 2. Base de Datos

```bash
# Generar cliente Prisma
cd nextjs_space
yarn prisma generate

# Ejecutar migraciones
yarn prisma db push

# Poblar base de datos con datos iniciales
yarn prisma db seed
```

### 3. Ejecutar la Aplicación

```bash
# Desarrollo
yarn dev

# Construcción para producción
yarn build
yarn start
```

La aplicación estará disponible en:
- **Sitio público**: http://localhost:3000
- **Panel admin**: http://localhost:3000/admin

## 🔐 Credenciales de Acceso

### Panel de Administración
- **Email**: `admin@saboremilia.cl`
- **Contraseña**: `admin123`
- **URL**: http://localhost:3000/admin

### Credenciales de Prueba MercadoPago
- **Ambiente**: TEST/Sandbox
- **Tarjetas de prueba**: [Ver documentación MercadoPago](https://www.mercadopago.cl/developers/es/docs/checkout-pro/additional-content/test-cards)

## 📊 Estructura de la Base de Datos

### Tablas Principales
- **products**: Catálogo de productos con precios, imágenes y categorías
- **categories**: Categorías de productos (Canapés, Mini Quiches, etc.)
- **orders**: Pedidos con información de cliente y estados
- **order_items**: Items específicos de cada pedido
- **contacts**: Formularios de contacto y consultas
- **users**: Usuarios administradores del sistema
- **configuration**: Configuraciones del sistema (costos envío, etc.)

## 🎨 Catálogo Inicial

El sistema viene pre-poblado con 12 productos distribuidos en 4 categorías:

### Canapés
- Canapé de Salmón Ahumado ($45.000)
- Canapé de Queso de Cabra con Miel ($42.000)
- Canapé de Paté de Foie con Mermelada ($55.000)

### Mini Quiches
- Mini Quiche de Espinaca y Queso de Cabra ($38.000)
- Mini Quiche Lorraine ($40.000)
- Mini Quiche de Champiñones y Gruyère ($41.000)

### Mini Empanadas
- Mini Empanadas de Queso ($32.000)
- Mini Empanadas de Pino ($35.000)
- Mini Empanadas de Camarón ($48.000)

### Petit Fours Dulces
- Petit Fours de Chocolate Belga ($42.000)
- Petit Fours de Frutos Rojos ($40.000)
- Petit Fours de Limón ($39.000)

*Todos los precios son por docena en pesos chilenos*

## 🚚 Configuración de Envío

- **Tarifa estándar**: $3.000 CLP
- **Envío gratuito**: Pedidos sobre $50.000 CLP
- **Cobertura**: Villa Alemana y comunas cercanas
- **Tiempo de entrega**: 24-48 horas

## 🔧 Gestión de Productos

### Agregar Nuevos Productos
1. Accede al panel de administración
2. Ve a "Productos" > "Agregar Nuevo"
3. Completa información y sube imagen
4. Asigna categoría y establece precio
5. Activa disponibilidad

### Gestionar Pedidos
1. Dashboard muestra resumen de pedidos
2. "Pedidos" permite ver lista completa
3. Actualizar estados: Pendiente → Confirmado → Entregado
4. Seguimiento de pagos con MercadoPago

### Configuraciones del Sistema
- **Costo de envío**: Modificable desde panel admin
- **Usuarios**: Gestión de accesos administrativos
- **Contactos**: Visualización de consultas recibidas

## 🔄 Estados de Pedidos

### Estados de Pedido
- **PENDING**: Recibido, esperando pago
- **CONFIRMED**: Pagado y confirmado
- **PREPARING**: En preparación
- **READY**: Listo para entrega
- **DELIVERED**: Entregado
- **CANCELLED**: Cancelado

### Estados de Pago
- **PENDING**: Esperando pago
- **PAID**: Pagado exitosamente
- **FAILED**: Pago fallido
- **REFUNDED**: Reembolsado

## 🌐 Despliegue a Producción

### Cambiar a MercadoPago Producción
1. Registrarse en [MercadoPago](https://mercadopago.cl)
2. Obtener credenciales de producción
3. Actualizar variables de entorno:
   - `MP_PUBLIC_KEY` (sin prefijo TEST)
   - `MP_ACCESS_TOKEN` (sin prefijo TEST)
4. Configurar webhook URL en MercadoPago

### Configurar Dominio Personalizado
1. Actualizar `NEXTAUTH_URL` con dominio real
2. Configurar SSL/HTTPS
3. Actualizar URLs en MercadoPago (success, failure, pending)

## 📞 Soporte y Contacto

- **Sitio web**: Formulario de contacto integrado
- **Email**: contacto.cocteleria.saboremilia@gmail.com
- **Teléfono**: +56 9 7859 4407
- **Ubicación**: Villa Alemana, V Región

## 📄 Licencia

Sitio web desarrollado exclusivamente para Coctelería Sabor Emilia.
Todos los derechos reservados © 2025.

---

**Desarrollado con ❤️ para Coctelería Sabor Emilia**
*Tu destino gourmet en Villa Alemana*
