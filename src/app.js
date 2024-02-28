const express = require('express')

const { ProductManager } = require('../modules/productManager')


const app = express()
app.use(express.urlencoded({ extended: true }))

const filename = '../assets/Productos.json'
const prod = new ProductManager(filename)






app.get('/products', ((req, res) => {
    
    try{
        const productos = prod.getProducts()
        res.json(productos)

    }
    catch{

    }
    res.send(prod.getProducts())
}))

app.get('/usuario', ((req, res) => {
    res.json({
        name: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john_doe@gmail.com'
    })
}))

app.listen(8080, () => {
    console.log('servidor listo')
})