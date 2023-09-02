module.exports = (app) => {
  const products = require('../controllers/product.controller');
  const router = require('express').Router();

  const multer = require('multer');
  const path = require('path');
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../assets/img'));
    },
    // konfigurasi penamaan file yang unik
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  router.get('/', products.findAll);
  router.post('/', multer({ storage: diskStorage }).single('image'), products.create);
  router.get('/hot-items', products.findHotProducts);
  router.get('/:id', products.findOne);
  router.put('/:id', multer({ storage: diskStorage }).single('image'), products.update);
  router.delete('/:id', products.delete);
  router.get('/image/:imgId', products.getImg);

  app.use('/api/products', router);
};
