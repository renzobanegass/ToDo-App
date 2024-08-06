# ToDo-App

Este es un proyecto de una aplicación de ToDo construida con .NET Core 7 y Angular 16.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Convenciones de Commits](#convenciones-de-commits)

## Descripción

ToDo-App es una aplicación simple para gestionar tareas. La aplicación no utiliza borrado lógico ni genéricos debido al alcance de la misma.
Aún no está terminada, aún falta:
- Autenticación de usuarios
- Búsqueda y filtros
- Correciones de estilos

## Instalación

Para poner en marcha el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/renzobanegass/ToDo-App.git
    cd ToDo-App
    ```

2. Configura la API:

    - Navega a la carpeta de la API:

      ```bash
      cd ToDoApp.Api
      ```

    - Restaura las dependencias y actualiza la base de datos con las últimas migraciones:

      ```bash
      dotnet restore
      dotnet ef database update
      ```

3. Configura el frontend:

    - Navega a la carpeta del frontend:

      ```bash
      cd ../ToDoApp.Client
      ```

    - Instala las dependencias:

      ```bash
      npm install
      ```

4. Ejecuta la aplicación:

    - Para iniciar la API:

      ```bash
      cd ../ToDoApp.Api
      dotnet run
      ```

    - Para iniciar el frontend:

      ```bash
      cd ../ToDoApp.Client
      ng serve
      ```

    La aplicación estará disponible en `http://localhost:4200`.

## Uso

Una vez que la aplicación esté en funcionamiento, podrás gestionar tus tareas, crear nuevas, editarlas y eliminarlas.

## Convenciones de Commits

Este proyecto utiliza convenciones de commits para mantener un historial de cambios claro y estructurado. A partir del refactor de la API, se implementaron las siguientes convenciones:

- `feat`: Una nueva característica
- `fix`: Una corrección de bug
- `docs`: Cambios en la documentación
- `style`: Cambios que no afectan el significado del código (espacios en blanco, formato, etc.)
- `refactor`: Cambios en el código que no corrigen errores ni añaden características
- `test`: Añadir pruebas o corregir las existentes
- `chore`: Actualizaciones de tareas de construcción, configuración de administrador de paquetes, etc.
