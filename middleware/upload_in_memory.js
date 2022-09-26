const multer  = require('multer')
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;
const storage = multer.memoryStorage()

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
const cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 3 }])
module.exports = cpUpload
