const express = require('express');
const fs = require('fs');
const util = require('util');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;


const productManager = new ProductManager('products.json');

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
  console.log(`Server running on port ${port}`);
});
