const express = require('express')
const app = express()
const fs = require('fs');
const user_routes = require('./routes/user.js')
const product_routes = require('./routes/product.js')
const general_routes = require('./routes/general.js')
const club_routes = require('./routes/club.js')
const country_routes = require('./routes/country.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const auth = require("./middleware/auth");
var cors = require('cors')
app.use(cors({
    origin: '*'
}));
require('dotenv').config()
// new
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
// new
const connectDB = mongoose.connect(process.env.MONGO_URI)
    .then(
        (result) => { console.log('Mongo DB Connected'); app.listen(5000)})
    .catch(
        (err) => {
            console.log(Error)
        } 
    )
console.log('Mongoose connect status : '+connectDB)
const logger  = (req, res, next) => {
    let req_details = {
        timestamp: new Date(), 
        url : req.url,
        params: req.params,
        query: req.query
    }
    fs.appendFile('log.txt', "\n"+JSON.stringify(req_details),'utf8', function (err) {
        if (err) return console.log(err);
      });
    next()
}
app.use(logger) 

// app.listen(5000, () => {
//     console.log('server is listening on port 5000')
// })
// app.get('/', (req,res) => {
//     res.send('welcome to the node js rest api')
// })
// const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.json())

// app.use('/api/user', auth,  user_routes)
app.use('/api/user',  user_routes)
app.use('/api/product', product_routes)
app.use('/api/club', club_routes)
app.use('/api/country', country_routes)
app.use('/', general_routes)


app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

  app.use('/api/blog', require('./routes/blog'));