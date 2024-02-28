const fs = require('fs')


class ProductManager {
  #path
  static #ultimoIdProducto = 1

  constructor(pathof) {
    this.products = []
    this.#path = pathof
  }
  #getNuevoId() {
    const id = ProductManager.#ultimoIdProducto
    ProductManager.#ultimoIdProducto++
    return id
  }



  async addProduct(title, description, price, thumbnail, code, stock) {

    if (title || description || price || thumbnail || code || stock) {
      if (this.products.some(product => product.code === code)) {

        return console.log('Error: ya existe un producto con ese codigo')
      }

      const newProduct = {
        id: this.#getNuevoId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }
      this.products.push(newProduct)
      await fs.promises.writeFile(this.#path, JSON.stringify(this.products, null, '\t'))


    } else { return console.log('los campos no pueden estar vacios') }
  }
  async getProducts() {
    try {
      const contenidoProductos = await fs.promises.readFile(this.#path)
      

      
      return contenidoProductos
      
    }
    catch (err) {
      throw(err)
    }
  }




  async getProductById(id) {
    try {
      const contenidoProductos = JSON.parse(await fs.promises.readFile(this.#path))

      const foundProduct = contenidoProductos.find(product => product.id === id);

      if (foundProduct) {
        console.log(foundProduct)
      }
      console.log("Not Found")
    }
    catch {
      console.error("Error al procesar solicitud")

    }

  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      let contenidoProductos = JSON.parse(await fs.promises.readFile(this.#path))

      const foundProductIdx = contenidoProductos.findIndex(product => product.id === id);
      const dataUp = contenidoProductos[foundProductIdx]
      if (foundProductIdx) {
        dataUp.title = title
        dataUp.description = description
        dataUp.price = price
        dataUp.thumbnail = thumbnail
        dataUp.code = code
        dataUp.stock = stock
        await fs.promises.writeFile(this.#path, JSON.stringify(contenidoProductos, null, '\t'))
      }

    }
    catch {
      console.error("error al actualizar el contenido")

    }
  }
  async deleteProduct(id) {
    try {
      let contenidoProductos = JSON.parse(await fs.promises.readFile(this.#path))
      const foundProductIdx = contenidoProductos.findIndex(product => product.id === id);
      if (foundProductIdx) {
        contenidoProductos.splice(foundProductIdx, 1)
        await fs.promises.writeFile(this.#path, JSON.stringify(contenidoProductos, null, '\t'))
      }
      console.log('No es posible encontrar el producto a eliminar')
    }
    catch {
      console.log('error al eliminar el producto')
    }


  }

};


module.exports = {
  ProductManager
}
