const fs=require('fs');
FilePath="./test.txt"
const result=fs.readFileSync(FilePath,"utf-8")
console.log(result)
//Reading File Async
fs.readFile(FilePath,"utf-8",(error,data)=>{
    if(error)throw error;
    console.log(data)
})