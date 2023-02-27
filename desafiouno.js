class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (this.products.some((product) => product.code === code)) {
      throw new Error(`El código ${code} ya existe`);
    }
    const product = {
      id: this.nextId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.nextId++;
    this.products.push(product);
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Not found");
    }
  }
}










