import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace(" ","_"));
    }
  });

export const upload = multer({
    storage: storage
});