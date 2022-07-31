const express = require('express')
const app = express()
const fs = require('fs');
const user_routes = require('./routes/user.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config()

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
const router = express.Router()
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); 
app.use('/api/user', user_routes)