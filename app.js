const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

app.post('/products', (req, res) => {
  // name and price product will be recorded on products array
  const { name, price } = req.body;
  const product = {
    name, 
    price,
    id: randomUUID()
  }

  products.push(product);

  writeProductsFile();

  return res.json(product);
});

app.get('/products', (req, res) => {
  return res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(product => product.id === id);

  return res.json(product);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex(product => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  writeProductsFile();

  return res.json({ message: 'Successfully updated.' });
});

app.delete('/products/:id', (req,res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(product => product.id === id);

  products.splice(productIndex, 1);

  writeProductsFile();

  return res.json({ message: 'Successfully deleted.' });
});

function writeProductsFile() {
  fs.writeFile('products.json', JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Product created');
    }
  });
}

app.listen(4002, () => console.log('Server running at port 4002'));