const Router = require('express').Router();
const multer = require('multer');
var storage = require('../middleware/multer');
const { success, error } = require('../utils/apiResponse');
const upload = multer({
  storage: storage,
});

const cpUpload = upload.array('files', 10);

Router.use('/auth', require('./auth'));
Router.use('/trucks', require('./trucks'));
Router.use('/users', require('./users'));
Router.post('/upload', cpUpload, (req, res, next) => {
  try {
    const filesPath = req.files.map((i) => `${ process.env.BASE_URL }/store/${ i.filename }`);
    success(filesPath)(req, res, next);
  }
  catch (e) {
    console.error(e);
    error({
      message: 'Interval server error', reason: e,
    }, 400)(req, res, next);
  }
});

module.exports = Router;
