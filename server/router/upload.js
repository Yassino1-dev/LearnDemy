const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null, '/media/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(/ /g, '_'));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize : 1024 * 1024 * 50
    }
});
console.log('Up up');

router.post('/',upload.single('file') , (req, res, next) => {
    res.status(200).json({
        message: 'Video upload successful'
    });
});

module.exports = router;