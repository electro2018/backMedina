const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const PRODUCTS_DB_PATH = './productos.json';
const CARTS_DB_PATH = './carritos.json';

// Helper functions to work with files
const readDataFromFile = (filePath) => {
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);
  return data;
};

const writeDataToFile = (filePath, data) => {
  const rawData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, rawData);
};

// Helper function to auto-generate IDs
const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Routes for products
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  const products = readDataFromFile(PRODUCTS_DB_PATH);
  const limit = req.query.limit || products.length;
  const result = products.slice(0, limit);
  res.json(result);
});

productsRouter.get('/:pid', (req, res) => {
  const products = readDataFromFile(PRODUCTS_DB_PATH);
  const product = products.find((p) => p.id == req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

productsRouter.post('/', (req, res) => {
  const products = readDataFromFile(PRODUCTS_DB_PATH);
  const newProduct = {
    id: generateId(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status || true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [],
  };
  products.push(newProduct);
  writeDataToFile(PRODUCTS_DB_PATH, products);
  res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const products = readDataFromFile(PRODUCTS_DB_PATH);
  const index = products.findIndex((p) => p.id == req.params.pid);
  if (index !== -1) {
    const updatedProduct = {
      ...products[index],
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails || products[index].thumbnails,
    };
    products[index] = updatedProduct;
    writeDataToFile(PRODUCTS_DB_PATH, products);
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

productsRouter.delete('/:pid', (req, res) => {
  const products = readDataFromFile(PRODUCTS_DB_PATH);
  const index = products.findIndex((p) => p.id == req.params.pid);
  if
