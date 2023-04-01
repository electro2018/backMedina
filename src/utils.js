const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const exphbs = require('express-handlebars');

// Configuramos el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Creamos la ruta para la vista home.handlebars
app.get('/', (req, res) => {
  // Lógica para obtener la lista de productos
  res.render('home', { products: productList });
});

// Creamos la ruta para la vista realtimeProducts.handlebars
app.get('/realtimeproducts', (req, res) => {
  // Lógica para obtener la lista de productos
  res.render('realtimeProducts', { products: productList });
});

// Creamos la ruta para recibir la petición POST del formulario
app.post('/addProduct', (req, res) => {
  // Lógica para agregar un nuevo producto a la lista
  io.emit('newProduct', newProduct); // Emitimos el evento 'newProduct' a todos los clientes conectados
  res.redirect('/realtimeproducts'); // Redireccionamos a la vista realtimeProducts.handlebars
});

// Creamos la ruta para recibir la petición DELETE
app.delete('/deleteProduct/:id', (req, res) => {
  // Lógica para eliminar el producto con el ID proporcionado
  io.emit('deleteProduct', idToDelete); // Emitimos el evento 'deleteProduct' a todos los clientes conectados
  res.redirect('/realtimeproducts'); // Redireccionamos a la vista realtimeProducts.handlebars
});

// Configuramos el servidor de socket.io
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
