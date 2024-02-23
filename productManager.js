const fs = require('fs')
const filename = './Productos.json'

class ProductManager {
  static #ultimoIdProducto = 1

  constructor() {
    this.products = []
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
      await fs.promises.writeFile(filename, JSON.stringify(this.products, null, '\t'))


    } else { return console.log('los campos no pueden estar vacios') }
  }
  async getProducts() {
    try {
      const contenidoProductos = await fs.promises.readFile(filename)
      return JSON.parse(contenidoProductos)
    }
    catch (err) {
      return []
    }
  }




  async getProductById(id) {
    try {
      const contenidoProductos = JSON.parse(await fs.promises.readFile(filename))

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
      let contenidoProductos = JSON.parse(await fs.promises.readFile(filename))

      const foundProductIdx = contenidoProductos.findIndex(product => product.id === id);
      const dataUp = contenidoProductos[foundProductIdx]
      if (foundProductIdx) {
        dataUp.title = title
        dataUp.description = description
        dataUp.price = price
        dataUp.thumbnail = thumbnail
        dataUp.code = code
        dataUp.stock = stock
        await fs.promises.writeFile(filename, JSON.stringify(contenidoProductos, null, '\t'))
      }

    }
    catch {
      console.error("error al actualizar el contenido")

    }
  }
  async deleteProduct(id) {
    try {
      let contenidoProductos = JSON.parse(await fs.promises.readFile(filename))
      const foundProductIdx = contenidoProductos.findIndex(product => product.id === id);
      if (foundProductIdx) {
        contenidoProductos.splice(foundProductIdx, 1)
        await fs.promises.writeFile(filename, JSON.stringify(contenidoProductos, null, '\t'))
      }
      console.log('No es posible encontrar el producto a eliminar')
    }
    catch{
      console.log('error al eliminar el producto')
    }


  }

}



const main = async () => {
  const prod = new ProductManager()
  await prod.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
  await prod.addProduct('producto prueba2', 'Este es un producto prueba', 200, 'Sin imagen', 'abc1234', 25)
  await prod.updateProduct(2, 'producto prueba3', 'Este es un producto prueba3', 400, 'Sin imagen', 'abc1234', 50)
  //console.log(await prod.getProducts())
  
  await prod.deleteProduct(5)
  await prod.getProductById(2)
}




main()