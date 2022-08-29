const mongoose = require('mongoose')

const underscoreToArrayofObjectIdSplit =  (params) => {
    let splitted = params.split('_')
    splitted = splitted.map(item => {
        return new mongoose.Types.ObjectId(item)
    })
    // console.log('whole splitted', splitted)
    return splitted
}

const underscoreToArrayLoweCaseSplit =  (params) => {
    let splitted = params.split('_')
    splitted = splitted.map(item => {
        return item.toLowerCase()
    })
    return splitted
}

module.exports = {
    underscoreToArrayofObjectIdSplit,
    underscoreToArrayLoweCaseSplit
}