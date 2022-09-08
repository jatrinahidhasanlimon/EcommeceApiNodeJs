console.log('request details', req.files)
    const reqLogo = req.files.logo
    const bufferData = reqLogo[0].buffer
    console.log('A File is : ',bufferData)
    var dimensions = sizeOf(bufferData);
    console.log('height ', dimensions.height)
    console.log('width ', dimensions.width)
    console.log('Buffer byte is: ',Buffer.byteLength(bufferData));
    console.log('Buffer Kilo byte is: ',Buffer.byteLength(bufferData)/ 1024);
    var filename = reqLogo[0].originalname
    console.log('File Name is:', filename)
    fs.writeFile('./uploads/' + filename, bufferData, 'binary', function(err) {
    if (err) throw err
            res.end('File is uploaded')
    })