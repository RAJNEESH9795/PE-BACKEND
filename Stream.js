import fs from 'fs';


const readStream = fs.createReadStream("./test.txt");
const writeStream = fs.createWriteStream("./output.txt");

// readStream.on('data', (chunk) => {
//     console.log(chunk);
// });
// readStream.on('end', () => {
//     console.log("File Read Completed");
// })
//

// writeStream.write("Hello, this is my first write stream.\n");

readStream.pipe(writeStream);
// writeStream.end();

writeStream.on('finish', () => {
    console.log("File Write Completed");
});