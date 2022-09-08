const mongoose = require('mongoose')
const fs = require('fs');

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
const hyphenToArrayLoweCaseSplit =  (params) => {
    let splitted = params.split('-')
    splitted = splitted.map(item => {
        return item.toLowerCase()
    })
    return splitted
}
const makeDirectory = (dir) => {
   fs.exists(dir, exist => {
        if (!exist) {
             return fs.mkdir(dir)
        }
        return dir
    })
    return dir

}
const streamToBuffer = async (readStream) => {
    return new Promise((resolve, reject) => {
        const bufferData = [];
        readStream.on('data', (chunk) => {
          bufferData.push(chunk);
        });
        readStream.on('end', () => {
          resolve(Buffer.concat(bufferData))
        })
        readStream.on('error', (err) => {
          reject(err)
        })
      })
}

module.exports = {
    underscoreToArrayofObjectIdSplit,
    underscoreToArrayLoweCaseSplit,
    hyphenToArrayLoweCaseSplit,
    makeDirectory,
    streamToBuffer

}