const express = require('express');
const fs = require('fs');
const util = require('util');
const ProductManager = require('./server');

const app = express();
const port = 3000;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const productManager = new ProductManager(readFileAsync, writeFileAsync);

app.get('/products', async (req, res) => {
  let limit = parseInt(req.query.limit);

  if (isNaN(limit)) {
    res.json(await productManager.getAllProducts());
  } else {
    res.json(await productManager.getProductsByLimit(limit));
  }
});

app.get('/products/:pid', async (req, res) => {
  let productId = req.params.pid;

  res.json(await productManager.getProductById(productId));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
