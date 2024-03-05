const express = require('express');

const { ProductManager } = require('../modules/productManager');


const app = express();
app.use(express.urlencoded({ extended: true }))

const filename = '../assets/Productos.json'
const prod = new ProductManager(filename)
prod.in



app.get('/test', ((req, res) => {
    res.send('test valido')
}))


app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        const allProducts = await prod.getProducts()
        if (limit > 0) {
            allProducts.slice(0, limit)
            res.json(allProducts)

        }
        res.json(allProducts)
    }
    catch (err) {
        throw (err)
    }

})

app.get('/products/:pid', async (req, res) => {
    try{
        const productoPoId = await prod.getProductById(req.params.pid)
        
        if (productoPoId){
            res.json(productoPoId)
        }
        res.send({error: "producto no encontrado"})
        

    }
    catch(err){
        throw(err)

    }





})

prod.iniciar()
    .then(() => {

        app.listen(8080, () => {
            console.log('servidor listo')
        })
    })


