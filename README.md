🚀 MongoDB - Proyecto CRUD

📌 Índice:

📖 Introducción
📚 Documentación
🐞 Errores Conocidos
📖 Introducción

Este proyecto pone en práctica el uso de CRUD (Create, Read, Update, Delete) utilizando Postman, una interfaz para el cliente y la gestión de datos con MongoDB.

📚 Documentación

🔧 Requisitos previos
Antes de comenzar, asegúrate de tener MongoDB instalado en tu sistema. Luego, abre una terminal y ejecuta:

mongod
Para iniciar el proyecto en modo desarrollo, usa:

npm run dev
🔗 Endpoints disponibles
Una vez el servidor esté en funcionamiento, podrás realizar consultas CRUD en Postman o desde la página web:

🔹 API para carrito:
http://localhost:8080/api/cart/

🔹 API para productos:
http://localhost:8080/api/products/

🔹 Interfaz web:
http://localhost:8080/home (Algunas secciones pueden estar en desarrollo 🚧)

🔹 Acceso directo a MongoDB Compass:

mongodb://127.0.0.1:27017/solarflow
🗂️ Estructura de los productos
Los productos en la base de datos siguen este esquema:

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
⛔ Cerrar el servidor
Para detener MongoDB y el proyecto, simplemente presiona Ctrl + C en la terminal correspondiente.

🐞 Errores Conocidos

📌 Bug #1:
Al crear un producto nuevo en realTimeProducts, este se guarda correctamente, pero la lista no se actualiza automáticamente.

📌 Bug #2:
El favicon de la página necesita un fondo claro para mejorar su visibilidad en temas oscuros.