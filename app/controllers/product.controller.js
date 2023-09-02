const fs = require('fs');
const db = require('../models');
const Product = db.products;

exports.findAll = (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving product.',
      });
    });
};

exports.findHotProducts = (req, res) => {
  Product.find({ hotItems: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving product.',
      });
    });
};

exports.create = (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    full_description: req.body.full_description,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    hotItems: req.body.hotItems,
  });
  const file = req.file.filename;
  if (!file) {
    res.status(400).send({
      status: false,
      data: 'No File is selected.',
    });
  }
  const url = process.env.SERVER_SCHEME + '://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/api/products/image/' + file;

  product.image = url;

  product
    .save(product)
    .then((result) => {
      res.send({
        message: 'Your item has been successfully uploaded',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while create product.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while show product.',
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const product = req.body;
  const file = req.file;
  if (file) {
    const url = process.env.SERVER_SCHEME + '://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/api/products/image/' + file.filename;
    product.image = url;

    Product.findById(id)
      .then(async (result) => {
        const imageName = result.image.split('/').slice(-1).pop();
        console.log(imageName);
        await fs.unlinkSync('./assets/img/' + imageName);
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || 'The product is not found',
        });
      });
  }

  Product.findByIdAndUpdate(id, product)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Product not found',
        });
      }
      res.send({
        message: 'Your product has been updated',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while update product.',
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(async (result) => {
      const imageName = result.image.split('/').slice(-1).pop();
      console.log(imageName);
      await fs.unlinkSync('./assets/img/' + imageName);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'The product is not found',
      });
    });

  Product.findByIdAndRemove(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Product not found',
        });
      }

      res.send({
        message: 'Product was deleted',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while delete product.',
      });
    });
};

exports.getImg = (req, res) => {
  const fileName = req.params.imgId;
  const path = require('path');
  res.sendFile(path.join(__dirname, '../../assets/img/' + fileName));
};
