const fs = require('fs');
const db = require('../models');
const Sell = db.sells;

exports.findAll = (req, res) => {
  Sell.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving your product.',
      });
    });
};

exports.create = (req, res) => {
  const sell = new Sell({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    phone: req.body.phone,
    flaws: req.body.flaws,
  });

  const file = req.file.filename;
  if (!file) {
    res.status(400).send({
      status: false,
      message: 'No File is selected.',
    });
  }
  const url = process.env.SERVER_SCHEME + '://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/api/sells/image/' + file;

  sell.image = url;

  sell
    .save(sell)
    .then((result) => {
      res.send({
        message: 'Your item has been successfully uploaded',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while sell product.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Sell.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while show sell item.',
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Sell.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Item not found',
        });
      }

      res.send({
        message: 'Item was updated',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while update Item.',
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Sell.findById(id)
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

  Sell.findByIdAndRemove(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Item not found',
        });
      }

      res.send({
        message: 'Item was deleted',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while delete Item.',
      });
    });
};

exports.getImg = (req, res) => {
  const fileName = req.params.imgId;
  const path = require('path');
  res.sendFile(path.join(__dirname, '../../assets/img/' + fileName));
};
