# Instrucciones de Desarrollo - SmartTravel

Eres un asistente de codificación experto para el proyecto SmartTravel. Debes seguir estrictamente estas reglas para mantener la consistencia y la arquitectura del sistema.

## 🟢 Estándares de TypeScript y Angular
- **Tipado Estricto**: Usa siempre tipos estrictos. Prefiere la inferencia de tipos cuando sea obvia.
- **Evitar `any`**: No uses el tipo `any`. Usa `unknown` si el tipo es incierto.
- **Componentes Standalone**: Usa siempre componentes Standalone (es el estándar en Angular v20+). No uses `standalone: true` en el decorador ya que es el valor predeterminado.
- **Creación de Componentes**: Usa siempre `ng generate component [ruta/nombre] --standalone`.
- **Creación de Servicios**: Usa siempre `ng generate service [ruta/nombre]`.
- **Estructura de Archivos**: Los componentes **DEBEN** tener archivos separados para lógica (`.ts`), plantilla (`.html`), estilos (`.css`) y pruebas (`.spec.ts`). Prohibido el uso de `template` o `styles` inline.
- **Componentes**: Cada componente debe estar dentro de una carpeta y dentro de ella de sigue la **Estructura de Archivos**`definida anteriormente, unicamente para ese componente. **Prohibido** colocar diferentes componentes dentro de esa carpeta.
- **Manejo de Estado**: Usa **Signals** para la gestión del estado reactivo.
- **Inyección de Dependencias**: Prefiere la función `inject()` sobre la inyección por constructor.
- **Carga Perezosa**: Implementa Lazy Loading para todas las rutas de funcionalidades.
- **Atributos de Host**: NO uses `@HostBinding` ni `@HostListener`. Define los bindings dentro del objeto `host` en el decorador `@Component`.
- **Optimización**: Usa `NgOptimizedImage` para todas las imágenes estáticas.

## ♿ Accesibilidad (A11y)
- El código **DEBE** pasar todas las pruebas de AXE.
- Sigue los estándares mínimos de WCAG AA (gestión de foco, contraste de color y atributos ARIA).

## 🌍 Internacionalización (i18n)
- Todo texto visible para el usuario **DEBE** implementarse usando traducciones.
- Usa el pipe `{{ 'KEY' | translate }}` en HTML o `TranslateService` en TypeScript.
- Las claves están en `public/i18n/es.json` y `en.json`. No inventes claves sin agregarlas a estos archivos.

## 🎨 Temas y Estilos
- Usa **SIEMPRE** las variables CSS definidas en `src/app/presentation/service/theme/theme.css`.
- **PROHIBIDO** el uso de colores en hexadecimal, RGB o nombres de colores fijos en los componentes. Usa `var(--color-primary)`, `var(--bg-main)`, `var(--text-main)`, etc.
- Respeta el diseño premium: usa bordes redondeados (`var(--radius-lg)`), sombras suaves (`var(--shadow-md)`) y tipografías correctas (`var(--font-headline)` para títulos).

## 📱 Responsividad y Mobile First
- **Todas** las interfaces **DEBEN** ser responsivas y estar optimizadas para celulares.
- El punto de ruptura (*breakpoint*) estándar para móviles **DEBE** ser `@media (max-width: 768px)`.
- Prioriza que el contenido principal sea visible sin necesidad de scroll excesivo en dispositivos móviles.

## � Tipografía y Escalabilidad de Fuente
- **TODOS** los tamaños de fuente **DEBEN** usar unidades `rem` en lugar de `px`. Esto permite que el sistema de escalado de fuente funcione correctamente.
- Ejemplo correcto: `font-size: 1rem;` o `font-size: 0.875rem;`
- Ejemplo incorrecto: `font-size: 16px;` o `font-size: 14px;`
- El servicio `FontSizeService` (`src/app/presentation/service/font-size/font-size.service.ts`) gestiona la escala de fuente globalmente mediante la variable CSS `--font-scale`.
- Los usuarios pueden ajustar el tamaño de letra en 4 niveles: pequeño (0.875x), normal (1x), grande (1.125x), extra-grande (1.25x).
- **Nunca** uses `px` directamente para font-size en ningún componente, layout o página.

## �📂 Arquitectura y Estructura de Carpetas
Debes colocar los archivos en las rutas correspondientes:
- **Componentes de UI Global**: `src/app/presentation/components/ui` (Botones, inputs, tarjetas básicas).
- **Componentes de Presentación**: `src/app/presentation/components` (Componentes reutilizables de negocio).
- **Layouts**: `src/app/presentation/layouts` (Estructuras de página como Sidebar, Navbar).
- **Páginas**: `src/app/presentation/pages` (Componentes que representan rutas completas).
- **Constantes**: `src/app/presentation/constants` (Archivos de constantes, opciones predefinidas y configuraciones estáticas).
- **Repositorios**: Siempre usa la infraestructura de Supabase en `src/app/infrastructure/repositories/supabase`.

## 🏗️ Dominio y Entidades
- **NO MODIFICAR** las entidades en `src/app/domain/entities` a menos que el usuario lo solicite explícitamente. El dominio es el corazón del sistema y debe permanecer estable.

## ✨ Iconos
- Usa exclusivamente la librería **Lucide Angular**.
- **Carga Local**: No cargues iconos globalmente en `app.config.ts`. Cada componente debe importar los iconos que necesita en su decorador `@Component` de la siguiente manera estricta (como se hace en `login-page.component.ts`) para evitar errores:
  1. Importar `LucideAngularModule` en el array `imports`.
  2. Proveer los iconos específicos usando el array `providers` con `LUCIDE_ICONS` y `LucideIconProvider`.
  Ejemplo:
  ```typescript
  import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Mail } from 'lucide-angular';
  
  @Component({
    imports: [LucideAngularModule],
    providers: [{
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Mail })
    }]
  })
  ```
  **PROHIBIDO** usar `LucideAngularModule.pick(...)` en el array de `imports`.

## 🔄 Flujo de Control de Angular
- **Sintaxis Moderna**: Utiliza SIEMPRE la nueva sintaxis de flujo de control introducida en Angular v17+ (`@if`, `@for`, `@switch`) en lugar de las directivas estructurales antiguas (`*ngIf`, `*ngFor`, `*ngSwitch`).
