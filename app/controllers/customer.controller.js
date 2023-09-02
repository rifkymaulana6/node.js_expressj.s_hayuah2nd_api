const bcrypt = require('bcrypt');
const db = require('../models');
const Customer = db.customers;
const jwt = require('jsonwebtoken');

exports.findAll = (req, res) => {
  Customer.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving customer.',
      });
    });
};

// exports.create = (req, res) => {
//     const customer = new Customer({
//         name: req.body.name,
//         email: req.body.email,
//         address: req.body.address,
//         phone: req.body.phone,
//         password: req.body.password
//     })

//     customer.save(customer)
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         res.status(409).send({
//             message: err.message || "Some error while creating customer."
//         })
//     });
// }

exports.register = async (req, res) => {
  const { name, email, address, phone, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ message: 'Password not match with Confirm Passsword' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Customer.create({
      name: name,
      email: email,
      address: address,
      phone: phone,
      password: hashPassword,
    });
    res.json({ message: 'Register Berhasil' });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      email: req.body.email,
    });
    const match = await bcrypt.compare(req.body.password, customer.password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });
    const customerId = customer.id;
    const name = customer.name;
    const email = customer.email;
    const accessToken = jwt.sign({ customerId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    });
    const refreshToken = jwt.sign({ customerId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    await Customer.findByIdAndUpdate(customerId, { refresh_token: refreshToken });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: 'Email not found' });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const customer = await Customer.findOne({
    refresh_token: refreshToken,
  });
  if (!customer) return res.sendStatus(204);
  const customerId = customer.id;
  await Customer.findByIdAndUpdate(customerId, { refresh_token: null });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while show customer.',
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Customer.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Customer not found',
        });
      }

      res.send({
        message: 'Customer was updated',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while update customer.',
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Customer not found',
        });
      }

      res.send({
        message: 'Customer was deleted',
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while delete customer.',
      });
    });
};
