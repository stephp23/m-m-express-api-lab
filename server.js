const Product = require('./models/product');
const express = require('express');
const PORT = process.env.PORT || 5000;
const db = require("./db/index")
const app = express();
db.on('error', console.error.bind(console, 'MongoDB connection error'))
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send("This is the root");
})
app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) throw Error('Product not found')
    res.json(product)
  } catch (e) {
    console.log(e)
    res.send('Product not found')
  }
})

app.get('/brands', async (req, res) => {
  const brands = await Brand.find()
  res.json(brands)
})
app.get('/brands/:id', async (req, res) => {
  try {
    const { id } = req.params
    const brand = await Brand.findById(id)
    if (!brand) throw Error('Brand not found')
    res.json(brand)
  } catch (e) {
    console.log(e)
    res.send('Brand not found')
  }
});