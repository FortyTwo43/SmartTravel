---
name: "accessibility-html"
description: "Esta habilidad te proporciona conocimientos de HTML accesible siguiendo el principio de priorizar la semántica antes que ARIA. Usalo cuando necesites generar HTML, por ejemplo en componentes de Angular"
---

## Regla Principal

Siempre prefiere HTML semántico antes de utilizar ARIA.

Bueno:

```html
<button>Guardar</button>
<nav></nav>
<main></main>
```

Malo:

```html
<div role="button">Guardar</div>
<div role="navigation"></div>
```

## Estructura Semántica

Prefiere:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Evita el anidamiento innecesario de elementos `div`.

## Formularios

Todo control de formulario debe tener:

* una etiqueta visible (`label`)
* un `id` asociado
* un nombre accesible

Bueno:

```html
<label for="email">Correo electrónico</label>
<input id="email" type="email">
```

Alternativa cuando no sea posible usar una etiqueta visible:

```html
<input
  type="email"
  aria-label="Correo electrónico">
```

## Imágenes

Imágenes informativas:

```html
<img src="..." alt="Descripción">
```

Imágenes decorativas:

```html
<img src="..." alt="">
```

## Atributos ARIA Permitidos

Úsalos únicamente cuando sean necesarios:

* aria-label
* aria-labelledby
* aria-describedby
* aria-expanded
* aria-hidden
* aria-current
* aria-live

No agregues atributos ARIA sin un propósito claro.

## Botones

Los botones que solo contienen un ícono deben tener:

```html
<button aria-label="Cerrar">
```

## Diálogos

Los diálogos personalizados deben utilizar:

```html
role="dialog"
aria-labelledby
aria-describedby
```

## Navegación

Página actual:

```html
aria-current="page"
```

## Componentes Expandibles

Acordeones, menús desplegables y componentes colapsables:

```html
aria-expanded="true"
aria-expanded="false"
```

## Accesibilidad por Teclado

Todos los elementos interactivos deben ser accesibles mediante teclado.

Si se requieren controles personalizados:

```html
role="button"
tabindex="0"
```

Deben manejar:

* Enter
* Espacio

## Patrones Prohibidos

Nunca generes:

```html
<button role="button">
<nav role="navigation">
```

Nunca agregues atributos ARIA que dupliquen la semántica nativa de HTML.

## Componentes Angular

Al generar plantillas Angular:

* prioriza HTML semántico
* asegúrate de que los formularios sean accesibles
* asegúrate de que los botones tengan nombres accesibles
* asegúrate de que los diálogos utilicen ARIA correctamente
* asegúrate de que las tablas incluyan encabezados adecuados
* evita el uso innecesario de ARIA
* prefiere el comportamiento nativo de HTML siempre que sea posible

```
```
