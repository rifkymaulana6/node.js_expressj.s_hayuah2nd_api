const db = require('../models');
const Customer = db.customers;
const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const customer = await Customer.findOne({
      refresh_token: refreshToken,
    });
    if (!customer) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decaded) => {
      if (err) return res.sendStatus(403);
      const customerId = customer.id;
      const name = customer.name;
      const email = customer.email;
      const accessToken = jwt.sign({ customerId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
      });
      res.json({ accessToken });
    });
  } catch (error) {}
};
