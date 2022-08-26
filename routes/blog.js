const express = require('express');
const router = express.Router();
const { Blog } = require("../models/Blog");

const { auth } = require("../middleware/auth");
const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031 

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createPost", async (req, res) => {
    let blog = new Blog({ content: req.body.blog.content, writer: req.body.blog.userID });
    console.log('blog is',blog)
    // try {
    //     let create = await Blog.create(blog)
    //     res.status(200).json(create)
    // }catch(error){
    //     return res.status(400).json(validationErrorHumanify(error))
    // }
    blog.save((err, response) => {
        if (err) return res.json({ success: false, err });
        Blog.find({ _id: response._id })
            .populate('writer')
            .exec((err, result) => {
                let postInfo = result[0]
                if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true,  postInfo });
            })
    });
});


router.get("/getBlogs", (req, res) => {
    Blog.find()
        .populate("writer")
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
});

router.post("/getPost", (req, res) => {
    console.log(req.body)
    Blog.findOne({ "_id": req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});

module.exports = router;
