---
name: "project-architecture"
description: "Usa esta habilidad cuando necesites crear, modificar o mover un archivo en el proyecto. Explica Clean Architecture layers y responsibilidades"
---

## Capas

Presentation
Application (useCase)
Domain
Infrastructure

Las dependencias fluyen hacia adentro.

Presentation -> Application (useCase) -> Domain

Infrastructure implementa contratos definidos por Domain.

## Domain

Contiene:

- entidades
- objetos de valor
- interfaces de ui
- contratos de repositorio
- reglas de negocio

No debe depender de Angular, Supabase o HTTP.

## Application

Contiene:

- useCases (casos de uso)

Los useCases exponen un método execute().

Ejemplo:

LoadDashboardUseCase
CreateReservationUseCase

## Infrastructure

Contiene:

- implementaciones de repositorios (contratos definidos en domain)
- servicios de Supabase
- clientes HTTP
- APIs externas

## Presentation

Contiene:

- componets de Angular
- pages
- layouts


Nunca coloques lógica de negocio dentro de componentes.

La lógica de negocio pertenece a los use cases.