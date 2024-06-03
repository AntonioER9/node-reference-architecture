![](/assets/images/logo-node-js.png "NodeJS Logo")
# Baufest Starter – NodeJs
Proyecto plantilla para desarrollos de Baufest en tecnología NodeJS.

Referencia:
- [Confluence](https://baufest.atlassian.net/wiki/spaces/SWDEV/pages/2987819030/Arquitecturas+de+referencia)
- [OneDrive](https://baufestcloud.sharepoint.com/sites/BaunasCloud/UPDevelopment/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=sMNgOi&cid=85797ccd%2D5f53%2D4856%2Da7d1%2D80be60e3a380&FolderCTID=0x0120004BD02B53986692489994F371FDD6040E&id=%2Fsites%2FBaunasCloud%2FUPDevelopment%2FShared%20Documents%2FServices%2FArquitecturas%20de%20Referencia%2FBackend%2FNodeJS&viewid=759458e1%2D6952%2D46af%2Db292%2Dfd52a1728c64)

# Tabla de contenidos

- [1. Arquitectura de referencia](#1-arquitectura-de-referencia)
  - [Diagrama de arquitectura](#diagrama-de-arquitectura)
  - [Descripción del diagrama (resumen)](#descripción-del-diagrama-resumen)
- [2. Estructura del Proyecto](#2-estructura-del-proyecto)
- [3. Guía para configurar el ambiente de desarrollo](#3-guía-para-configurar-el-ambiente-de-desarrollo)
  - [a. Windows](#a-windows)
  - [b. MacOS](#b-macos)
  - [c. Linux](#c-linux)
- [4.- Guía para clonar, ejecutar la plantilla y comenzar a desarrollar](#4--guía-para-clonar-ejecutar-la-plantilla-y-comenzar-a-desarrollar)
  - [Pre-verificacion](#pre-verificacion)
  - [Clonado:](#clonado)
  - [Pre-ajustes:](#pre-ajustes)
  - [Ejecución y debugging:](#ejecución-y-debugging)
- [5. Historial de cambios](#5-historial-de-cambios)
- [6. ¿Cómo contribuyo?](#6-cómo-contribuyo)
- [7. Agradecimientos](#7-agradecimientos)


# 1. Arquitectura de referencia

## Diagrama de arquitectura
![](/assets/images/nodejs.drawio.png "Arquitectura de Referencia" )

## Descripción del diagrama (resumen)
El diagrama presente transmite una visión general de la arquitectura propuesta para la interfaz de usuario Web, aquí observaremos un breve resumen de cada componente.

| Sección | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1       | Solución NodeJS construida utilizando NestJS y Typescript como lenguaje de programación.​                                                                        |
| 2       | La capa de APIs REST contiene los puntos de acceso a los servicios de la aplicación.​                                                                             |
| 3       | La capa de dominio representa el dominio de negocio. Contiene las reglas de negocio y restricciones que se reflejan al modelar los requerimientos funcionales.​   |
| 4       | La capa de infraestructura contiene las operaciones de acceso a datos, tanto a bases de datos como a servicios externos.​                                         |
| 5       | La solución cuenta con un conjunto de librerías, frameworks y herramientas que proporcionan un soporte cross a las diferentes capas.​                             |

Se puede encontrar más información en los siguientes enlaces:
- [Documento Word](https://baufestcloud.sharepoint.com/:w:/r/sites/BaunasCloud/UPDevelopment/Shared%20Documents/Services/Arquitecturas%20de%20Referencia/Backend/NodeJS/node.docx?d=w8e50a8160c174acc957e69e18b2d797a&csf=1&web=1&e=mNLuYi)
- [Presentación PowerPoint](https://baufestcloud.sharepoint.com/:p:/r/sites/BaunasCloud/UPDevelopment/Shared%20Documents/Services/Arquitecturas%20de%20Referencia/Backend/NodeJS/node.pptx?d=w527e2cc662ae4b18a959c4fae6afa0c9&csf=1&web=1&e=ecsTHX)

Si se desea modificar la imagen de muestra de la arquitectura, se puede utilizar el siguiente enlace:
- [Archivo editable drawio](https://baufestcloud.sharepoint.com/:u:/r/sites/BaunasCloud/UPDevelopment/Shared%20Documents/Services/Arquitecturas%20de%20Referencia/Backend/NodeJS/nodejs.drawio?csf=1&web=1&e=tZ6Erg)

<a name="estructura-del-proyecto"></a>
# 2. Estructura del proyecto

### Estructura de carpetas
```
 - src
     - auth
         auth.module.ts
         jwt.strategy.ts
         jwt-auth.guard.ts
         oidcdiscovery.service.ts
     + health
     + users
     - infrastructure
        - persistence
            repository-base.ts
     - nasa-images
        - commands
            - handlers
                flush-nasa-images-to-cache.handler.ts
                save-nasa-image-to-cache.handler.ts
            - impl
                flush-nasa-image-cache.command.ts
                save-nasa-images-to-cache.command.ts
        - queries
            - handlers
                nasa-images.query-handler.ts
            - impl
                nasa-images.query.ts
        - core
            nasa-images-api.interface.ts
            nasa-images-search-cache.entity.ts
            nasa-images.interface.ts
        - infrastructure
            nasa-images-api.service.ts
        nasa-images.controller.spec.ts
        nasa-images.controller.ts
        nasa-images.module.ts
     app.controller.spec.ts
     app.controller.ts
     app.module.ts
     app.service.ts
     main.ts
 - test
 - assets
     + images
 - sqlite
 + enviroments
```

### Descripción de las carpetas principales

1. [x] src/auth

   Contiene los archivos del módulo de autenticación de su aplicación

   ```
   - auth.module.ts:        Contiene el módulo llamado AuthModule, que define y configura la autenticación de la aplicación con sus componentes.
   - jwt.strategy.ts:      Define y configura el componente gestor del JWT
   - jwt-auth.guard.ts :   Define la guarda que usarán los controllers para aplicar un método de auntenticación JWT
   - oidcdiscovery.service.ts: Define el service que administrará los JWT con el server
    ```

2. [x] src/health/

   Contiene el módulo, cómo los componentes necesarios para poder monitorear el estado de la aplicación

3. [x] src/users

   Contiene el módulo de la aplicación para la gestión de usuarios como ejemplo de un "feature module".
   
4. [x] src/nasa-images
   Contiene el módulo de la aplicación para la busqueda de imagenes en la API externa de la NASA. 
   Internamente maneja cuatro sub-carpetas:
   * **core**: contiene las entidades, value-objects, agregados y definiciones de infrastructure de forma abstracta (interfaces).
   * **commands**: contiene los comandos asi como los command-handlers.
   * **queries**: contiene las queries asi como los query-handlers.
   * **infrastructure**: contiene la implementacion de las interfaces de infraestructura que define core.

5. [x] app.controller.spec.ts

   Pruebas unitarias del componente app.controller

6. [x] app.controller.ts

   Clase controller que define (con sus respectivos métodos HTTP) y expone paths dentro de la aplicación

7. [x] app.module.ts

   Contiene el módulo principal de la aplicación, el cual importa otros modulos

8. [x] app.service.ts

   Clase service que define e implementa métodos para aplicar la lógica dentro del módulo principal

9.  [x] main.ts

   Archivo principal de la aplicación, desde el cual se definen y configuran carácteristicas propías de la aplicación (puerto, protocolo, middlewares, etc), así cómo definir el módulo principal

10. [x] test/

    Carpeta que contiene configuración y pruebas unitarias de los compomentes principales

11. [x] sqlite/

    ```
    - En esta carpeta  disponemos archivos de imagenes, videos y otros archivos (por ejemplo si tenemos una serie de archivos pdf que se descargar de nuestra aplicación) que se copiarán tal cual en la aplicación definitiva
    - Cuando compilamos la aplicación de Angular el contenido de la carpeta 'assets' queda sin cambios y debe ser subida al servidor de internet junto con el resto de archivos.
    ```

12. [x] assets/

    ```
    - En esta carpeta  disponemos archivos de imagenes, videos y otros archivos (por ejemplo si tenemos una serie de archivos pdf que se descargar de nuestra aplicación) que se copiarán tal cual en la aplicación definitiva
    - Cuando compilamos la aplicación de Angular el contenido de la carpeta 'assets' queda sin cambios y debe ser subida al servidor de internet junto con el resto de archivos.
    ```

13. [x] environments/

    ```
    En esta carpeta encontraremos archivos de configuración base, variables de entorno en diferentes ambientes como desarrollo, test, producción, etc.
    - environment.prod.ts 
    - environment.ts
    ```

# 3. Guía para configurar el ambiente de desarrollo
## a. Windows

- Instalar Node.js
    - Ir a [Node.js](https://nodejs.org/en/download/) 
    - En Windows Installer seleccionar el instalador de Windows ( .msi ) correspondiente ( 32-bit o 64-bit )
    - Una vez descargado, ejecutar y seguir las instrucciones para instalar Node.js

- Instalar Git
    - Ir a [Git](https://git-scm.com/download/win) 
    - En Standalone Installer seleccionar el instalador de Windows ( .exe ) correspondiente ( 32-bit o 64-bit )
    - Una vez descargado, ejecutar y seguir las instrucciones para instalar Git

## b. MacOS 

- Instalar Node.js
    - Ir a [Node.js](https://nodejs.org/en/download/) 
    - En macOS Installer seleccionar el instalador de macOS ( .pkg ) 
    - Una vez descargado, ejecutar y seguir las instrucciones para instalar Node.js

- Instalar Git
    - Ir a [Git](https://git-scm.com/download/win) 
    - En Binary installer seleccionar el instalador de macOs ( .dmg )
    - Una vez descargado, ejecutar y seguir las instrucciones para instalar Git
## c. Linux 

- Instalar Node.js 
    - Abrir la terminal y ejecutar los siguientes comandos 
        ```    
        sudo apt-get update
        sudo apt-get install node
        sudo apt-get install npm
        ```
- Instalar Git
    - Abrir la terminal y ejecutar los siguientes comandos 
        ```    
        sudo apt-get update
        sudo apt-get upgrade
        sudo apt-get install git
        ```

# 4.- Guía para clonar, ejecutar la plantilla y comenzar a desarrollar

## Pre-verificacion

* Para comprobar tener todo lo necesario correctamente instalado, en una nueva terminal ejecuta el seguimiento comando:

	`node --version`
	`npm --version`
	`git --version`
   
  

## Clonado:

Esta plantilla deberá ser clonada por medio de degit. A continuación se muestran los pasos:

  

* Si jamás se a usando degit se deberá usar los siguientes comandos

  

	`npm uninstall -g degit`

	`npm install -g tiged`

  

* Clonar desde gitlab

  

	`degit gitlab:baufest-arquitecturas-de-referencia/nodejs.git`

  
  

## Pre-ajustes:

  

 Ejecutar los siguiente comando

  

`npm run prepare`

`npm i `

 También se debe tomar en cuenta cambiar dentro del package.json los campos de
* name
* repository
* description
  

## Ejecución y debugging:

Ejecutar el mock server descargar desde [aqui](https://gitlab.baufest.com/baufest-arquitecturas-de-referencia/oauth2-mock-server-wrapper).

Después realizar los comandos;
`yarn install`


Para ejecutar la plantilla se deben ejecutar los siguientes comandos:

`npm run start:dev`

  
Para ejecutar en debug:

`npm run start:debug`


Compilación manual para producción:
`npm run start:prod`

## Crear proyecto con el generador

1. Ingresar a [GitLab/access_token](https://gitlab.baufest.com/-/profile/personal_access_tokens) o seguir los pasos 2,3 y 4.

2. Ingresar a [Gitlab](https://gitlab.baufest.com)
y en la esquina superior derecha, selecciona tu avatar.

   ![](/assets/images/pasos-generador/paso2.png "Paso 2")

3. Seleccione Edit profile .

   ![](/assets/images/pasos-generador/paso3.png "Paso 3")
4. En la barra lateral izquierda, seleccione Access Tokens .

   ![](/assets/images/pasos-generador/paso4.png "Paso 4")

5. Completar token name , seleccione api y click en el botón 'Create Personal access token'.

   ![](/assets/images/pasos-generador/paso5.png "Paso 5")

6. Copiar el token

   ![](/assets/images/pasos-generador/paso6.png "Paso 6")

7. Abrir una terminal y ejecutar el siguiente comando completandolo con el token copiado en el paso anterior.

    ```
    npm config set -- //gitlab.baufest.com/api/v4/packages/npm/:_authToken=
    ```
    Ejemplo
    
    ![](/assets/images/pasos-generador/paso7.png "Paso 7")

8. Ejecutar el siguiente comando
    ```
    npm config set @baufest-arquitecturas-de-referencia:registry https://gitlab.baufest.com/api/v4/packages/npm/
    ```
9. Instalaremos Yeoman y generator-baufeststarter-nodejs-nestjs-rest usando npm (asumimos que tiene node.js preinstalado )

    ```
    npm install-g yo
    npm install-g@baufest-arquitecturas-de-referencia/generator-baufeststarter-nodejs-nestjs-rest

    ```
10. Para generar el proyecto usaremos el siguiente comando

    ```
    yo @baufest-arquitecturas-de-referencia/baufeststarter-nodejs-nestjs-rest

    ```

# 5. Docker

1. Es necesario instalar docker en tu dispostivo, algunos link de instalación son los siguientes:
   - [Windows](https://sloglessdev.medium.com/how-to-use-docker-on-windows-10-without-docker-desktop-548b39738268)
   - [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
   - [Mac](https://formulae.brew.sh/formula/docker)
2. Para constuir la imagen es necesario ejecutar el siguiente comando `docker build -t nest-server .`
    - La bandera **-t** es la bandera o nombre de la imagen
3. Para ejecutar la imagen construida se debe ejecutar el siguiente comando `docker run -dp 127.0.0.1:3000:3000 nest-server`
    - La bandera **-d** es para ejecutar el contenedor en segundo plano.
    - La bandera **-p** es para crear la asignación de puertos y host.

# 6. Historial de cambios
Ver ( [CHANGELOG.md](https://gitlab.baufest.com/baufest-arquitecturas-de-referencia/nodejs/-/blob/master/CHANGELOG.md) ).


# 7. ¿Cómo contribuyo?
Ver ( [CONTRIBUTING.md](https://gitlab.baufest.com/baufest-arquitecturas-de-referencia/nodejs/-/blob/master/CONTRIBUTING.md) ).

# 8. Agradecimientos
Un gran agradecimiento 👏👏 👏 a los Baufesian@s que participaron en construir este material:



