---
name: "Folder Structure Skill"
description: "Usa esta habilidad cuando necesites crear, modificar o mover un archivo en el proyecto. Explica las reglas de capas de arquitectura para crear carpetas y archivos correctamente"
---

# Esctrucura de carpetas

Nunca crees una carpeta a menos que ya exista la carpeta de la capa correspondiente.

## Domain

```
src/app/domain/
            ├── entities/
                ├── dtos/
                |    ├── ExpampleDTO.ts
                ├── ExampleEntity.ts
            ├── repositories/
                ├── ExampleRepository.ts
            └── ui/
                ├── proveedor/
                |    ├── dashboard/
                |    |    ├── ExampleUiEntity.ts
                ├── viajero/
                ├── admin/


``` 
### Explicacion de contenido de Domain
Las entidades que concuerdan con las tablas de la base de datos se encuentran en src/app/domain/entities/. 

DTOs que concuerden con las tablas de la base de datos estan en src/app/domain/entities/dtos/. 

Contratos de repositorios en src/app/domain/repositories/ 

Interfaces que se usan en la capa de presentacion se encuentran en src/app/domain/ui/ 

## Application

```
src/app/useCase/
            ├── proveedor/
            |  ├── dashboard/
            |  |    ├── DasboardUseCase.ts
            ├── traveler/
            └── admin/
```


### Explicacion de contenido de Application
Los casos de uso estan organizados por tipo de usuario.
Los casos de uso de organizan agrupando por la page que los usa. Por ejemplo DashboardUseCase.ts va en useCase/proveedor/dashboard.
Cada caso de uso tiene la forma ExecuteUseCase.ts

## Infrastructure

```
src/app/infrastructure/
                    ├── repositories/
                    |     ├── supabase/
                    |     |     ├── SupabaseRepositoryImplementation.ts
                    |     ├── otroPorveedorBackendSiExiste/   
``` 
### Explicacion de contenido de Infrastructure
Los repositorios son implementaciones de los contratos definidos en el domain. 
Los repositorios estan organizados agrupando por el backend que provee los datos. Por ejemplo SupabaseRepositoryImplementation.ts va en infrastructure/repositories/supabase/ 

## Presentation

```
presentation/

  components/
    proveedor/
        dashboard/
            dashboard-card/
                dashboard-card.component.html
                dasboard-card.component.ts
                dasboard-card.component.scss
                dasboard-card.component.spec.ts
        search/
            search-bar/
                search-bar.component.html
                search-bar.component.ts
                search-bar.component.scss
                search-bar.component.spec.ts
    viajero/
    admin/

  constants/
    contant-name.constants.ts

  pages/
    proveedor/
        dashboard/
            dashboard.component.html
            dasboard.component.ts
            dasboard.component.scss
            dasboard.component.spec.ts
        search/
            search.component.html
            dasboard.component.ts
            dasboard.component.scss
            dasboard.component.spec.ts
    viajero/
    admin/

  layouts/
    proveedor/
        proveedor-layout/
            proveedor-layout.component.html
            proveedor-layout.component.ts
            proveedor-layout.component.scss
            proveedor-layout.component.spec.ts
    viajero/
    admin/
```
### Explicacion de contenido de Presentation
Los componentes estan organizados por tipo de usuario. 
Los componentes se organizan agrupando por la page que los usa. Por ejemplo DashboardCardComponent.ts va en presentation/components/proveedor/dashboard/dashboard-card/.
Cada componente tiene la forma component-name.component.html, component-name.component.ts, component-name.component.scss y component-name.component.spec.ts.
Los layouts estan organizados por tipo de usuario.
Cada layout tiene la forma layout-name.component.html, layout-name.component.ts, layout-name.component.scss y layout-name.component.spec.ts. 