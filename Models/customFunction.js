const mongoose = require('mongoose')

const underscoreToArraySplit =  (params) => {
    let splitted = params.split('_')
    splitted = splitted.map(item => {
        return new mongoose.Types.ObjectId(item)
    })
    // console.log('whole splitted', splitted)
    return splitted
}

module.exports = {
    underscoreToArraySplit
}