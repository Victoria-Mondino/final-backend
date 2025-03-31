# MongoDB

Índice:
1. [Descripcion](#descripcion)  
2. [Documentacion](#documentacion)  
3. [Bugs](#bugs)

## Descripcion:
Puesta en práctica el CRUD en Postman, la interfaz para el cliente y el manejo en la base de datos de MongoDB.

## Documentacion:
Para desplegar el servidor se requiere tener MongoDB previamente instalado para luego ejecutar en la terminal los siguientes comandos:

```console
mongod
```

Luego ejecutar el siguiente comando para lanzar el proyecto en modo desarollo:

```console
npm run dev
```

Esto habilitará las consultas CRUD para Postman:

http://localhost:8080/api/cart/
http://localhost:8080/api/products/

También podrás utilizar la interfaz de la página, dentro de la misma podrás navegar entre las diferentes páginas disponibles (es probable que algunas aún estén en desarrollo y por lo tanto o no carguen, o se visualizan de manera incorrecta o te encuentres con algun desperfecto):

http://localhost:8080/home

Tambien tienes el acceso directo por si utilizas MongoDBCompass:

mongodb://127.0.0.1:27017/solarflow

La estructura de los productos es la siguiente:

```console
Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnails: { type: [String], default: [] },
    images: { type: [String], default: [] },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
});
```

Para dejar de ejecutar MongoDB y el proyecto, seleccionar la ventana de la termial deseada y presionar las siguientes teclas: Ctrl+C.

## Bugs:

# 1:
Al crear un producto nuevo en realTimepProducts, si bien se crea correctamente, el programa no actualiza la lista, por lo que por un lado favorece a el estilo ya creado, pero el nuevo no se le aplica el estilo.

# 2:
Deberia aplicarse un fondo claro para darle contraste al favicon de la pagina ya que en temas oscuros no se aprecia el icono.