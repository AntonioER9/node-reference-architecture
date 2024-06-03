# Arquitectura Node.js de referencia
    Todos los cambios notables en este proyecto se documentarán en este archivo.
    El formato se basa en [Keep a Changelog] (https://keepachangelog.com).

## [Unreleased]
## [1.0.0] - 2022-06-27
Arquitectura backend básica para una solucion Node.js


### Changed
Se actualizó el diagrama de arquitectura
### Changed
Se actualizó el archivo Readme y la url del Diagrama de arquitectura.
### Added
Se agregó el archivo Readme.
### Changed
Se renombró el servicio Nasa-Images y añadio SqlLite como cache
### Changed
Formateo del código
### Changed
Se actualizaron las librerias de npm
### Added
Se agregaron las librerias commitzen, commitlint y husky para establecer reglas en los mensajes de commit
### Fixed
Se corrigieron los tests unitarios y End to End
### Added
Se agregó el endpoint para la API de búsqueda básica de Imagenes NASA
### Added
Se agregó la generación dinámica de descripción y versión para OpenAPI basada en los atributos del paquete
### Added
Se agregó un endpoint para Health check (test de conexion a Base de datos)
### Added
Se agregó soporte para la autentificación OpenAPI
### Added
Se agregó la librería Helmet para incrementar la seguridad por default
### Added
Se agregó el descubrimiento dinámico de jwks uri basado en el endpoint Oidc Discovery .well-known/openid-configuration
### Added
Se agregó la libreria TypeORM incluyendo un ejemplo que utiliza SQLLITE3
### Added
Se agregó la validación para JWT Token utilizando OAUTH2/OPENID