module.exports = (app) => {
  const sells = require('../controllers/sell.controller');
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

  router.get('/', sells.findAll);
  router.post('/', multer({ storage: diskStorage }).single('image'), sells.create);
  router.get('/:id', sells.findOne);
  router.put('/:id', sells.update);
  router.delete('/:id', sells.delete);
  router.get('/image/:imgId', sells.getImg);

  app.use('/api/sells', router);
};
