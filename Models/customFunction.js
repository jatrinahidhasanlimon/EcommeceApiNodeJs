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
    console.log('directory is', dir)
   fs.existsSync(dir, exist => {
        if (!exist) {
             return fs.mkdirSync(dir)
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
const writeFileUsingBufferStream = async (targetPath, bufferedData, tempFilePath) => {
    fs.writeFile(targetPath, bufferedData, 'binary', function(err) {
        if (err) throw err
            fs.unlinkSync(tempFilePath);
    })
}

module.exports = {
    underscoreToArrayofObjectIdSplit,
    underscoreToArrayLoweCaseSplit,
    hyphenToArrayLoweCaseSplit,
    makeDirectory,
    streamToBuffer,
    writeFileUsingBufferStream

}