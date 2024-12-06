
# Integra Frontend

instalar dependencias
```bash
node i
```

levantar backend
```bash
ng serve --open --proxy-config proxy.conf.json
```


Este proyecto es una aplicación Angular que utiliza diversas bibliotecas para desarrollar una interfaz moderna y funcional. Aquí se detallan los pasos para configurar y ejecutar el proyecto en un entorno de desarrollo.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos antes de iniciar:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [Angular CLI](https://angular.io/cli) (puedes instalarlo globalmente con `npm install -g @angular/cli`)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd integra-angular
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del Proyecto

Para iniciar la aplicación en un entorno de desarrollo, utiliza el siguiente comando:

```bash
ng serve --open --proxy-config proxy.conf.json
```

- El comando abrirá automáticamente la aplicación en tu navegador predeterminado.
- Si deseas iniciar sin abrir automáticamente, puedes ejecutar solo:
  ```bash
  ng serve
  ```

## Scripts Disponibles

Los scripts definidos en `package.json` son los siguientes:

- `npm start`: Inicia el servidor de desarrollo y abre la aplicación en el navegador.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
- `npm run watch`: Construye continuamente la aplicación en modo de desarrollo.
- `npm test`: Ejecuta las pruebas unitarias.

## Configuración del Proxy

El archivo `proxy.conf.json` permite redirigir solicitudes a un backend específico durante el desarrollo. Asegúrate de configurar correctamente las rutas y URLs en este archivo según sea necesario.

Ejemplo de configuración de proxy:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

## Dependencias Clave

Este proyecto utiliza las siguientes bibliotecas y herramientas:

- **Angular Core**: Framework base para el desarrollo.
- **FullCalendar**: Gestión de calendarios y eventos.
- **Highcharts**: Visualización de gráficos.
- **NgRx**: Manejo del estado global.
- **Tailwind CSS**: Estilizado moderno y flexible.
- **SweetAlert2**: Ventanas modales y alertas.

Para más detalles, revisa las secciones de `dependencies` y `devDependencies` en el archivo `package.json`.

## Estilo de Código

Este proyecto utiliza **Prettier** con el plugin para **TailwindCSS** para asegurar un código ordenado y consistente. Puedes ejecutar Prettier manualmente con:

```bash
npx prettier --write .
```

## Contribuir

Si deseas contribuir al proyecto:

1. Crea un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. Realiza los cambios necesarios y realiza commit.
4. Envía un pull request.

## Licencia

Este proyecto está licenciado bajo los términos de [MIT](LICENSE).

---
¡Gracias por contribuir y mejorar este proyecto!
