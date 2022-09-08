readStream.on('data', (chunk) => {
    data.push(chunk);

    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end :', Buffer.concat(data));
    console.log('data from end is: ', data)
    // end : I am transferring in bytes by bytes called chunk
})
// readStream.on('error', (err) => {
//     console.log('error :', err)
// })
console.log('bufferData is: ', data)








var src = fs.createReadStream(tmp_path);
src.on('end', function(chunk){
    // console.log('chunk recieved', src)
    // var dimensions = sizeOf(chunk);
    // console.log('dimensions are: ', dimensions)
})
// console.log('read stream src: ', src)
var dest = fs.createWriteStream(targetPath);
src.pipe(dest);
src.on('end', function() { 
    fs.unlinkSync(tmp_path);
    return ('complete'); 
});
src.on('error', function(err) { 
    return ('error'); 
});
