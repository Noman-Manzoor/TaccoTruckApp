var multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    console.log(file)
    return cb(
      null,
      `${ file.fieldname }_${ Date.now() }${ path.extname(file.originalname) }`
    );
  },
});

module.exports = storage;
