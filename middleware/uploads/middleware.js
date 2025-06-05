import multer from 'multer';
import path from 'path';

// Nustatymai: kur saugoti ir kaip pavadinti
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Sukurk aplanką 'uploads' jei jo dar nėra
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
