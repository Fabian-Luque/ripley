## Para realizar la instalación del proyecto se deben cumplir los siguientes requisitos en la maquina.

* Docker
* git

## Pasos instalación

* Clonar proyecto ```git clone https://github.com/Fabian-Luque/ripley.git```
* cd Project_name 
* ```docker-compose up -d --build```
* Abrir navegador y abrir ```http://localhost:4201```
* Agregar minimo 2 usuarios para probar.



## Instalación sin docker


### requisitos
* node.js 12
* mongodb
* git
* Angular CLI


## Instalación

* Clonar proyecto ```git clone https://github.com/Fabian-Luque/ripley.git```
* cd Project_name 
* cd back
* ```npm install```
* ```npm start```
* Nueva terminal
* cd path/to/project/front
* ```npm install```
* ```ng serve -o```

## Consideraciones

* Los puertos 3000, 4201 y 27017 deben estar libres.
* El proyecto esta levantado en modo desarrollo.
