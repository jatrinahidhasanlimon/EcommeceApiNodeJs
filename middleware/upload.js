const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
});  

const fileFilter = (req, file, cb) => {
    console.log('Here is the file filter',file)
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
        console.log('Here is the file filter')
    } else{
        console.log('Here is the file filter')
        cb(null, false);

    }

};

let upload = multer({ storage: storage, fileFilter: fileFilter,});

// export default upload.single('image')
module.exports = upload.single('file')
