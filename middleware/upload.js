const multer  = require('multer')
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './uploads/category'
//         fs.exists(dir, exist => {
//         if (!exist) {
//             return fs.mkdir(dir, error => cb(error, dir))
//         }
//         return cb(null, dir)
//         })
//     },
//     filename: function (req, file, cb) {
//         const custom_image_name = Date.now() + "--" + file.originalname
//         cb(null, custom_image_name);
//         req.body.image = file.originalname
//     }
// });  
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    
    // console.log('Here is the file filter',file)
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
        // console.log('Here is the file filter', file.buffer)



    } else{
        return cb(new Error('Only  files are allowed!'), false);

    }

};

let upload = multer(
    { 
        storage: storage, 
        fileFilter: fileFilter,
        dest: './uploads/category',
        limits: { fileSize: maxSize },
    }
);
const cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 3 }])
// const cpUpload = upload.single('logo')
module.exports = cpUpload
