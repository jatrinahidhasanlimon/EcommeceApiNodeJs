const multer  = require('multer')
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './temp'
        fs.exists(dir, exist => {
        if (!exist) {
            return fs.mkdir(dir, error => cb(error, dir))
        }
        return cb(null, dir)
        })
    },
    filename: function (req, file, cb) {
        const custom_image_name = Date.now() + "_" + file.originalname
        cb(null, custom_image_name);
        req.body.image = file.originalname
    }
});  

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        return cb(new Error('Only  files are allowed!'), false);
    }
};
let upload = multer(
    { 
        storage: storage, 
        fileFilter: fileFilter,
        limits: { fileSize: maxSize },
    }
);
const cpUpload = upload.fields([
    { name: 'thumbnail', maxCount: 1 }, 
    { name: 'images', maxCount: 3 }
])
module.exports = cpUpload
