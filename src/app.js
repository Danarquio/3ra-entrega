const express = require("express")
const app = express()
const PORT = 3000


const products = [
    { id: 1 , nombre: "Bondiola Curada", precio: 3100, stock: 5000, minimo: 100,  categoria : "curados" , imagen: "./Imagenes/bondiola.png"},
    { id: 2 , nombre: "Jamón Serrano", precio: 4200, stock: 2000, minimo: 100,  categoria : "curados" , imagen: "./Imagenes/jamonserrano.png"},
    { id: 3 , nombre: "Salame", precio: 1990, stock: 8500, minimo: 200, categoria : "embutido", imagen: "./Imagenes/salame.png"},
    { id: 4 , nombre: "Charqui", precio: 1500, stock: 5500, minimo: 100,  categoria : "deshidratados" , imagen: "./Imagenes/charqui.png" },
    { id: 5 , nombre: "Chorizo", precio: 4800, stock: 6500, minimo: 250, categoria : "embutido" , imagen: "./Imagenes/Chorizo.png" },
    { id: 6 , nombre: "Jamon Cocido", precio: 2500, stock: 6500, minimo: 250, categoria : "embutido" , imagen: "./Imagenes/jamon.png" },
    { id: 7 , nombre: "Salchicha", precio: 3500, stock: 6500, minimo: 250, categoria : "embutido" , imagen: "./Imagenes/salchichas1.png" },
    { id: 8 , nombre: "Mortadela", precio: 1900, stock: 6500, minimo: 100, categoria : "embutido" , imagen: "./Imagenes/mortadela1.png" }
  ]

  app.get('/', (req, res) => {
    res.send(products)
  })


  app.get('/products', (req, res) => {
    const limit = req.query.limit || products.length;
    res.json(products.slice(0, limit));
  });
  

  app.get('/products/:id', (req, res) => {
    let idProducto = parseInt(req.params.id);
    let product = products.find(u => u.id === idProducto);
    
    if (!product) return res.send({ error: 'Producto no encontrado.' })
    res.send({ product })
  });

  
  app.get('/categoria', (req, res) => {
    const categoria = req.query.categoria;
    
    if (!categoria) {
        return res.send({ error: 'Debes proporcionar una categoría.' });
    }
    const categoriaFiltrada = products.filter(product => product.categoria === categoria);
    if (categoriaFiltrada.length === 0) {
        return res.send({ error: 'No se encontraron productos en esta categoría.' });
    }   
    res.send({ products: categoriaFiltrada });
});


app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})


/*
Para acceder desde el navegador a los productos, ingresar en el url:

Todos los productos
http://localhost:3000/

Por id de producto
http://localhost:3000//products/:id

Por categoria
http://localhost:3000/categoria?categoria=embutidos


*/