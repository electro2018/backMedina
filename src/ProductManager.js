const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.lastId = 0;
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      if (data) {
        this.products = JSON.parse(data);
        const lastProduct = this.products[this.products.length - 1];
        this.lastId = lastProduct.id;
      }
    } else {
      fs.writeFileSync(filePath, '');
    }
  }

  addProduct(product) {
    this.lastId++;
    product.id = this.lastId;
    this.products.push(product);
    this.saveToFile();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index >= 0) {
      const product = this.products[index];
      const updatedProduct = { ...product, ...updatedFields };
      this.products[index] = updatedProduct;
      this.saveToFile();
      return updatedProduct;
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.saveToFile();
      return true;
    }
    return false;
  }

  saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }
}

