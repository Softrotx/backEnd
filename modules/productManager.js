const fs = require('fs')


class ProductManager {
  #products
  #path
  static #ultimoIdProducto = 1

  constructor(pathof) {
    this.#products = []
    this.#path = pathof
  }
  async iniciar(){
    this.#products = await this.getProducts()
  }

  #getNuevoId() {
    const id = ProductManager.#ultimoIdProducto
    ProductManager.#ultimoIdProducto++
    return id
  }



  async addProduct(title, description, price, thumbnail, code, stock) {

    if (title || description || price || thumbnail || code || stock) {
      if (this.#products.some(product => product.code === code)) {

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
      this.#products.push(newProduct)
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))


    } else { return console.log('los campos no pueden estar vacios') }
  }

  async getProducts() {
    try {
      const contenidoProductos = await fs.promises.readFile(this.#path, 'utf-8')
      return JSON.parse(contenidoProductos)

    }
    catch (err) {
      throw (err)
    }
  }




  async getProductById(id) {
    try {
      const foundProduct = this.#products.find(product => product.id === id);
      console.log(this.#products)

      if (foundProduct) {
        return (foundProduct)
      }
      console.log("Not Found")
    }
    catch (err) {
      console.error("Error al procesar solicitud")
      throw (err)

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
