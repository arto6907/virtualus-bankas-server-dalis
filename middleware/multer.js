import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Užtikrinam, kad uploads katalogas egzistuoja
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Nustatom failų saugojimą
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // saugojimo katalogas
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName); // pvz. 1659876543210-123456789.jpg
  }
});

const upload = multer({ storage });

export default upload;
