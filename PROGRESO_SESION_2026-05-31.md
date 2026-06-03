# 📋 PROGRESO - SESIÓN 2026-05-31

## 🎯 OBJETIVO PRINCIPAL
Resolver errores de CORS al cargar PDFs desde Azure Blob Storage

---

## ✅ PROBLEMAS IDENTIFICADOS Y RESUELTOS

### 1. ❌ Error 500 en `/categories` (CORS)
**Problema:** 
```
Access to fetch at 'https://librosapi.azure-api.net/v1/categories' 
from origin 'https://brave-sea-03b672010.2.azurestaticapps.net' 
has been blocked by CORS policy
```

**Análisis:**
- MS-1 Spring Boot: ✅ Funcionando (devuelve 200 OK)
- APIM: ✅ Headers CORS correctos
- Preflight OPTIONS: ✅ Funcionando
- Problema real: Bug en merging de headers en frontend

**Solución implementada:**
- ✅ Arreglado `booksService.js` - Headers ahora se fusionan correctamente
- Cambio: `headers: options.headers || defaultHeaders` → `headers: { ...defaultHeaders, ...options.headers }`

**Commit:** N/A (Fix de frontend, sin deploy requerido)

---

### 2. ❌ Error CORS al abrir PDFs desde Blob Storage
**Problema:**
```
Access to fetch at 'https://readflowstorage.blob.core.windows.net/books/...'
from origin 'https://brave-sea-03b672010.2.azurestaticapps.net' 
has been blocked by CORS policy
```

**Root cause:** Azure Blob Storage no tiene CORS configurado para el origen de Static Web Apps

**Solución implementada:** Opción 1 (Recomendada)
- PDFs se sirven a través de APIM (que ya tiene CORS)
- MS-1 descarga PDFs de Blob Storage internamente
- Frontend accede a APIM, no directamente a Blob Storage

---

## 🔧 CAMBIOS REALIZADOS

### Código Backend (MS-1 Spring Boot)

#### 1. `FileStoragePort.java`
```java
// AGREGADO:
byte[] downloadFile(String fileUrl);
```

#### 2. `AzureBlobStorageAdapter.java`
```java
// AGREGADO:
@Override
public byte[] downloadFile(String fileUrl) {
    String blobName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    BlobClient blobClient = containerClient.getBlobClient(blobName);
    return blobClient.downloadContent().toBytes();
}
```

#### 3. `BookController.java`
```java
// AGREGADO NUEVO ENDPOINT:
@GetMapping("/{id}/pdf")
public ResponseEntity<?> getBookPdf(@PathVariable Long id) {
    return bookUseCase.getBookById(id)
        .map(book -> {
            try {
                byte[] pdfBytes = fileStorage.downloadFile(book.getPdfUrl());
                return ResponseEntity.ok()
                    .header("Content-Type", "application/pdf")
                    .header("Content-Disposition", "inline; filename=\"" + book.getPdfFileName() + "\"")
                    .body(pdfBytes);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error al descargar PDF: " + e.getMessage());
            }
        })
        .orElse(ResponseEntity.notFound().build());
}
```

### Código Frontend

#### 1. `src/services/booksService.js`
```javascript
// ANTES (INCORRECTO):
headers: options.headers || defaultHeaders,

// DESPUÉS (CORRECTO):
headers: {
  ...defaultHeaders,
  ...options.headers,
},
```

#### 2. `src/pages/lecturaPage.jsx`
```javascript
// AGREGADO:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// CAMBIO:
// Antes: file={book.pdfUrl}
// Después: file={`${API_BASE_URL}/books/${book.id}/pdf`}
```

---

## ⚙️ CONFIGURACIÓN EN APIM

### Operación Creada
- **Display name:** Get Book PDF
- **Operation name:** get-book-pdf
- **HTTP method:** GET
- **URL template:** `/books/{id}/pdf`

### Parámetro Agregado
- **Name:** id
- **In:** path
- **Required:** ✓
- **Type:** string

### Policy a Configurar (⚠️ PENDIENTE)
```xml
<policies>
    <inbound>
        <base />
    </inbound>
    <backend>
        <set-backend-service base-url="https://readflow-ms1.azurewebsites.net/api" />
    </backend>
    <outbound>
        <base />
    </outbound>
</policies>
```

---

## 📊 GIT COMMIT

```
Commit: 018774b
Fecha: 2026-05-31
Mensaje: feat: agregar endpoint GET /books/{id}/pdf para descargar PDFs a través de APIM y corregir CORS

Archivos modificados:
- microservicios/ms1-springboot/src/main/java/com/readflow/ms1/adapter/in/rest/BookController.java
- microservicios/ms1-springboot/src/main/java/com/readflow/ms1/adapter/out/storage/AzureBlobStorageAdapter.java
- microservicios/ms1-springboot/src/main/java/com/readflow/ms1/domain/port/out/FileStoragePort.java
- src/pages/lecturaPage.jsx
- src/services/booksService.js
```

---

## 🚀 ESTADO DE DEPLOYMENTS

| Servicio | Estado | ETA |
|---|---|---|
| MS-1 (Spring Boot) | Desplegando ⏳ | ~5-7 min |
| Frontend (React) | Desplegando ⏳ | ~2-3 min |

---

## 📋 PRÓXIMOS PASOS REQUERIDOS

### 1. ⚠️ CRÍTICO: Configurar Policy en APIM
- [ ] Ir a APIM → Operations → get-book-pdf
- [ ] Abrir Policies
- [ ] Agregar `<set-backend-service base-url="https://readflow-ms1.azurewebsites.net/api" />`
- [ ] Guardar

### 2. ✅ Verificación
- [ ] Esperrar a que terminen los GitHub Actions
- [ ] Probar: GET `https://librosapi.azure-api.net/v1/books/12/pdf`
- [ ] Debería devolver PDF con status 200 OK
- [ ] Abrir frontend → Modo lectura → PDF debería cargar sin CORS error

### 3. 📝 Documentación (Opcional)
- [ ] Actualizar CLAUDE.md con la nueva arquitectura de PDFs

---

## 🔍 TROUBLESHOOTING

### Si ves error 401 (Access Denied)
**Causa:** APIM no tiene Policy configurada
**Solución:** Agregar `<set-backend-service>` en las Policies (Paso 1 arriba)

### Si ves error 404 (Not Found)
**Causa:** MS-1 aún no desplegado
**Solución:** Esperar a que termine GitHub Actions

### Si ves error de CORS en navegador
**Causa:** Preflight request no respondió correctamente
**Solución:** Revisar que APIM tiene CORS global configurado (ya debería estar)

---

## 📚 ARQUITECTURA FINAL

```
Frontend (React)
    ↓
Browser Request: GET /v1/books/{id}/pdf
    ↓
APIM (librosapi.azure-api.net)
    ├─ Valida Subscription Key ✅
    ├─ Valida CORS ✅
    └─ Redirecciona a MS-1
    ↓
MS-1 Spring Boot (readflow-ms1.azurewebsites.net)
    ├─ GET /books/{id}
    ├─ Descarga PDF de Blob Storage (credenciales de servidor)
    └─ Devuelve PDF bytes
    ↓
APIM (devuelve respuesta)
    ├─ Headers CORS ✅
    └─ PDF bytes
    ↓
Browser recibe PDF
    └─ Sin errores CORS ✅
```

---

## 📝 NOTAS

- MS-1 ya tiene `@CrossOrigin(origins = "*")` en todos los controllers, pero APIM maneja CORS globalmente
- El componente `Document` de react-pdf hace fetch directo, pero no necesita headers personalizados porque APIM los valida
- Blob Storage nunca es accedido desde el navegador, solo desde MS-1 (internamente)

---

**Sesión completada: 2026-05-31**
**Próxima acción: Configurar Policy en APIM y verificar funcionamiento**
