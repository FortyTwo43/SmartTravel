# SmartTravel

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Entity Relationship Diagram

```mermaid
erDiagram

    auth.users{
        string id PK
        string email
        string encrypted_password
    }

    perfil {
        string id PK
        string nombre
        string apellido
        string rol
        date fecha_registro
        string estado
    }

    perfil_viajero {
        string id PK
        string id_perfil FK
        string intereses
        decimal presupuesto
        string idioma
    }

    destino {
        string id PK
        string nombre
        string ciudad
        string pais
        string descripcion
        string tipo_experiencia
        string imagen
    }

    servicio {
        string id PK
        string id_proveedor FK
        string id_destino FK
        string nombre
        string tipo_servicio
        string descripcion
        decimal precio
        boolean disponibilidad
        string estado
    }

    itinerario {
        string id PK
        string id_perfil FK
        string nombre
        date fecha_inicio
        date fecha_fin
        string estado
    }

    detalle_itinerario {
        string id PK
        string id_itinerario FK
        string id_servicio FK
        date fecha
        string hora
        string prioridad
        string estado
    }

    reserva {
        string id PK
        string id_perfil FK
        string id_servicio FK
        date fecha_reserva
        int cantidad_personas
        decimal precio_total
        string estado
    }

    recomendacion {
        string id PK
        string id_perfil FK
        string id_servicio FK
        string motivo
        date fecha_generada
    }

    notificacion {
        string id PK
        string id_perfil FK
        string mensaje
        date fecha_envio
        boolean leida
    }


    %% RELACIONES

    auth.users ||--|| perfil : tiene

    perfil ||--|| perfil_viajero : tiene

    perfil ||--o{ itinerario : crea

    perfil ||--o{ reserva : realiza

    perfil ||--o{ notificacion : recibe

    perfil ||--o{ recomendacion : obtiene

    destino ||--o{ servicio : contiene

    perfil ||--o{ servicio : publica

    itinerario ||--o{ detalle_itinerario : incluye

    servicio ||--o{ detalle_itinerario : pertenece

    servicio ||--o{ reserva : genera

    servicio ||--o{ recomendacion : recomendado
```
