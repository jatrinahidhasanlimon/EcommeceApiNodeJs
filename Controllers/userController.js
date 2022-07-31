const User = require('../models/User.js')
const getUsers = ((req, res) => {
    res.json('It all user route')
})

const getUser = ((req, res) => {
    const id = Number(req.params.userID)
    res.json('single Product id: ' + id)
})

const createUser =  ( async (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address
    }
    
    try {
        let create = await User.create(newUser)
        if(create ){
            console.log(create)
            res.send('User Created successfully: '+create)
        }
    }catch(ex){
        res.send('Failed to create')
    }
})

const updateUser = ((req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(User => product.id === id)
    const updatedUser = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }

    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

const deleteUser = ((req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(User => product.id === id)
    products.splice(index,1)
    res.status(200).json('Product deleted')
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}