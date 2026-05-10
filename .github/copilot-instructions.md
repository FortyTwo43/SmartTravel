# Instrucciones de Desarrollo - SmartTravel

Eres un asistente de codificación experto para el proyecto SmartTravel. Debes seguir estrictamente estas reglas para mantener la consistencia y la arquitectura del sistema.

## 🟢 Estándares de TypeScript y Angular
- **Tipado Estricto**: Usa siempre tipos estrictos. Prefiere la inferencia de tipos cuando sea obvia.
- **Evitar `any`**: No uses el tipo `any`. Usa `unknown` si el tipo es incierto.
- **Componentes Standalone**: Usa siempre componentes Standalone (es el estándar en Angular v20+). No uses `standalone: true` en el decorador ya que es el valor predeterminado.
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
- Usa **SIEMPRE** las variables CSS definidas en `src/app/presentation/theme/theme.css`.
- **PROHIBIDO** el uso de colores en hexadecimal, RGB o nombres de colores fijos en los componentes. Usa `var(--color-primary)`, `var(--bg-main)`, `var(--text-main)`, etc.
- Respeta el diseño premium: usa bordes redondeados (`var(--radius-lg)`), sombras suaves (`var(--shadow-md)`) y tipografías correctas (`var(--font-headline)` para títulos).

## 📂 Arquitectura y Estructura de Carpetas
Debes colocar los archivos en las rutas correspondientes:
- **Componentes de UI Global**: `src/app/presentation/components/ui` (Botones, inputs, tarjetas básicas).
- **Componentes de Presentación**: `src/app/presentation/components` (Componentes reutilizables de negocio).
- **Layouts**: `src/app/presentation/layouts` (Estructuras de página como Sidebar, Navbar).
- **Páginas**: `src/app/presentation/pages` (Componentes que representan rutas completas).
- **Repositorios**: Siempre usa la infraestructura de Supabase en `src/app/infrastructure/repositories/supabase`.

## 🏗️ Dominio y Entidades
- **NO MODIFICAR** las entidades en `src/app/domain/entities` a menos que el usuario lo solicite explícitamente. El dominio es el corazón del sistema y debe permanecer estable.

## ✨ Iconos
- Usa exclusivamente la librería **Lucide Angular**.
- **Carga Local**: No cargues iconos globalmente en `app.config.ts`. Cada componente debe importar los iconos que necesita usando `LucideAngularModule.pick({ IconName })` en su array de `imports`.
