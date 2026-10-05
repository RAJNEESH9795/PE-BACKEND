//
const fs=require('fs');
const FilePath="test.txt"
const Content="Thanking for attending my session"

fs.writeFileSync(FilePath,Content)//it will create file if not exist at given path and fi
//write file async
console.log("Bye")
fs.writeFile("./test2.txt","Demo of sync write of file",(err)=>{
    if(err)throw err;
    console.log("I am in file")
})
console.log("I am out of file")
