module.exports = (app) => {
  const customers = require('../controllers/customer.controller');
  const router = require('express').Router();
  const verifyToken = require('../../middleware/VerifyToken');
  const refreshToken = require('../controllers/RefreshToken');

  router.get('/', verifyToken.verifyToken, customers.findAll);
  router.get('/token', refreshToken.refreshToken);
  router.post('/', customers.register);
  router.post('/login', customers.login);
  router.delete('/logout', customers.logout);
  router.get('/:id', customers.findOne);
  router.put('/:id', customers.update);
  router.delete('/:id', customers.delete);

  app.use('/api/customers', router);
};
