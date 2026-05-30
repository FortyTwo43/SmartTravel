---
name: Angular Conventions Skill
description: Esta habilidad te proporciona conocimientos de convenciones de Angular. Usala cuando necesites generar código en Angular
---

## Convenciones de Angular

### Standalone Components

- Usa standalone components.

### Dependency Injection

- Usa inject() en lugar de inyeccion de dependencias en constructor.

### Signals

- Usa Signals en lugar de RxJS cuando sea posible.

### Control Flow

- Usa Control Flow syntax:

@if
@for
@switch

Evita usar:

*ngIf
*ngFor

### Change Detection

- Usa OnPush change detection.

### Business Logic

- Mantén los componentes delgados.

- Mueve la lógica de negocio a los use cases.