# Bot MESCyT - Persona 2 (Infraestructura + Sistema)

Sistema de chatbot conversacional basado en Dialogflow ES para MESCyT. Implementación completa con arquitectura limpia, gestión de configuración mediante variables de entorno y mapeo inteligente de intents a respuestas.

## Características

- 🤖 Integración con Dialogflow ES (detección de intents)
- 📝 Mapeo de intents a respuestas desde FAQs
- ⚙️ Configuración 100% mediante variables de entorno
- 🏗️ Arquitectura limpia y escalable
- 📊 Logging básico con marcas de tiempo
- ✅ Manejo robusto de errores
- 🔒 Sin credenciales hardcodeadas
- 📦 ES Modules (type: module)

## Estructura del Proyecto

```
bot-ia/
├── src/
│   ├── config/
│   │   ├── variables.js          # Carga y valida variables de entorno
│   │   └── dialogflow.js         # Cliente de Dialogflow configurado
│   ├── rutas/
│   │   ├── chat.js               # Rutas del chatbot POST /chat
│   │   └── salud.js              # Rutas de salud GET /salud
│   ├── servicios/
│   │   └── servicioDialogflow.js # Lógica de detección de intent y mapeo
│   ├── middleware/
│   │   ├── validador.js          # Validación de solicitudes
│   │   └── manejo-errores.js     # Manejo centralizado de errores
│   ├── utilidades/
│   │   ├── cargadores.js         # Carga de archivos JSON
│   │   └── registro.js           # Sistema de logging
│   └── index.js                  # Punto de entrada principal
├── jsons/
│   ├── faqs.json                 # Mapeo intent → respuesta
│   ├── intents.json              # Definiciones de intents
│   └── fallback.json             # Respuesta por defecto
├── package.json
├── .env.example                  # Plantilla de variables de entorno
├── .env                          # Variables de entorno (local)
├── .gitignore
└── README.md
```

## Instalación

### 1. Clonar o descargar el proyecto

```bash
cd bot-ia
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
PORT=3000
NODE_ENV=production
GOOGLE_PROJECT_ID=tu-proyecto-google-cloud
GOOGLE_CLIENT_EMAIL=bot-sa@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nTu_clave_privada_aqui\n-----END PRIVATE KEY-----\n
DIALOGFLOW_SESSION_ID=sesion-unica-12345678
DIALOGFLOW_LANGUAGE_CODE=es-ES
```

## Obtener Credenciales de Google Cloud

1. Crear proyecto en [Google Cloud Console](https://console.cloud.google.com)
2. Habilitar API de Dialogflow
3. Crear cuenta de servicio (Service Account)
4. Descargar clave JSON
5. Copiar valores a `.env`:
   - `project_id` → `GOOGLE_PROJECT_ID`
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

## Uso

### Iniciar servidor

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor escucha en `http://localhost:3000`

### Endpoints

#### POST /chat
Enviar un mensaje y obtener respuesta del chatbot.

**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"como solicito una beca"}'
```

**Response (éxito):**
```json
{
  "exito": true,
  "datos": {
    "respuesta": "Puedes solicitar una beca del MESCyT a través de su portal web oficial cuando las convocatorias estén abiertas.",
    "intent": "becas_solicitud",
    "conMensaje": true
  }
}
```

**Response (fallback):**
```json
{
  "exito": true,
  "datos": {
    "respuesta": "No entendí tu pregunta. Puedes intentar con temas como becas, solicitudes, documentos o información general del MESCyT.",
    "intent": "fallback",
    "conMensaje": false
  }
}
```

#### GET /salud
Verificar estado del servidor.

**Request:**
```bash
curl http://localhost:3000/salud
```

**Response:**
```json
{
  "exito": true,
  "estado": "operativo",
  "marca": "2024-04-13T01:45:00.000Z"
}
```

#### GET /
Información general de la API.

**Request:**
```bash
curl http://localhost:3000/
```

**Response:**
```json
{
  "nombre": "Bot MESCyT API",
  "version": "1.0.0",
  "estado": "activo"
}
```

## Flujo de Funcionamiento

1. **Cliente envía mensaje** → POST `/chat`
2. **Validación** → Middleware verifica formato y contenido
3. **Envío a Dialogflow** → Detecta el intent del mensaje
4. **Mapeo de Intent** → Busca en `faqs.json`
5. **Respuesta** → Retorna respuesta o fallback
6. **Logging** → Registra operación con marca temporal

## Flujos de Respuesta

### Caso 1: Intent Detectado
```
Mensaje → Dialogflow → Intent encontrado → Buscar en FAQs → Respuesta específica
```

### Caso 2: Intent No Detectado (Fallback)
```
Mensaje → Dialogflow → Intent desconocido → Usar fallback.json → Respuesta genérica
```

### Caso 3: Error en Dialogflow
```
Mensaje → Dialogflow → Error de conexión → Respuesta fallback + log
```

## Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `production` o `development` |
| `GOOGLE_PROJECT_ID` | ID del proyecto Google Cloud | `mi-proyecto-123` |
| `GOOGLE_CLIENT_EMAIL` | Email de la cuenta de servicio | `bot@proyecto.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Clave privada de la cuenta de servicio | `-----BEGIN PRIVATE KEY-----\n...` |
| `DIALOGFLOW_SESSION_ID` | ID único de sesión | `sesion-001` |
| `DIALOGFLOW_LANGUAGE_CODE` | Código de idioma (opcional) | `es-ES` |

## Archivos JSON

### faqs.json
Mapeo de intents a respuestas. Estructura:
```json
[
  {
    "intent": "nombre_del_intent",
    "answer": "Respuesta del bot"
  }
]
```

### intents.json
Definición de intents con ejemplos de usuario. Estructura:
```json
{
  "nombre_intent": [
    "ejemplo 1",
    "ejemplo 2"
  ]
}
```

### fallback.json
Respuesta por defecto. Estructura:
```json
{
  "fallback": "Mensaje de respuesta por defecto"
}
```

## Manejo de Errores

El sistema maneja:
- Solicitudes malformadas (400)
- Content-Type inválido (415)
- Errores de conexión a Dialogflow
- Intents no encontrados (usa fallback)
- Errores internos del servidor (500)

Todos los errores se registran con marca temporal.

## Logging

Cada operación se registra con:
- Marca de tiempo ISO 8601
- Nivel de severidad (info, error, advertencia)
- Contexto relevante

Ejemplo:
```
[2024-04-13T01:45:00.000Z] [INFO] Solicitud POST /chat recibida
[2024-04-13T01:45:00.100Z] [INFO] Iniciando detección de intent
[2024-04-13T01:45:00.500Z] [INFO] Intent detectado
```

## Variables de Entorno en Desarrollo

Para desarrollo local, usar `.env`:

```env
PORT=3000
NODE_ENV=development
GOOGLE_PROJECT_ID=tu-proyecto-dev
GOOGLE_CLIENT_EMAIL=dev@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=...
DIALOGFLOW_SESSION_ID=dev-session-001
```

Para producción, establecer variables en el entorno de ejecución.

## Dependencias

- **@google-cloud/dialogflow**: Cliente oficial de Google Cloud para Dialogflow
- **express**: Framework web minimalista
- **dotenv**: Carga variables de entorno desde `.env`

## Scripts Disponibles

- `npm start` → Inicia el servidor en modo producción
- `npm run dev` → Inicia el servidor con nodemon (modo desarrollo)

## Seguridad

✅ Sin credenciales hardcodeadas
✅ Uso de variables de entorno para todas las configuraciones sensibles
✅ Validación de solicitudes entrantes
✅ Manejo centralizado de errores
✅ HTTPS recomendado en producción

## Notas Importantes

- Las credenciales de Google Cloud se obtienen del archivo de clave JSON descargado
- El `DIALOGFLOW_SESSION_ID` debe ser único por sesión de usuario
- El servidor requiere Node.js >= 18.0.0
- El archivo `.env` NO debe ser versionado (está en `.gitignore`)

## Próximas Mejoras

- Autenticación JWT para clientes
- Rate limiting
- Caché Redis para respuestas frecuentes
- Métricas y monitoreo
- WebSocket para comunicación bidireccional
- Base de datos para historial de conversaciones

## Autor

Generado como Persona 2 (Infraestructura + Sistema)

## Licencia

ISC
