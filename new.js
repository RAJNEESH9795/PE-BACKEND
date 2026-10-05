const fs = require('fs');

const FilePath = "student.txt";

const Content = "Welcome to Node.js File System";

// Write file
fs.writeFileSync(FilePath, Content);

console.log("File created and data written successfully");

// Read file
const data = fs.readFileSync(FilePath, "utf-8");

console.log("File Data:");
console.log(data);