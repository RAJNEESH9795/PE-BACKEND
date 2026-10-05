// //call http module
const http=require("http")
const fs=require("fs")
// const Port=3000
// //create http server
// const server=http.createServer((req,res)=>{
//     res.end("Hello")
// })
// server.listen(Port,()=>{
//     console.log("Server is Listenining....")
// })
const PORT=4000;
const server=http.createServer((req,res)=>{
   
    // if (req.url==="/"&&req.method==="GET") {
    //     console.log(req.headers);
    //     res.end("You are in Home Page");
         
    // }
    // else if (req.url==="/about"&&req.method==="GET") {
    //     console.log(req.headers);
    //     res.end("Contacts us");
    // }
    // else {
    //     console.log(req.headers);
    //     res.statusCode=404;
    //     res.end("Page Not Found");

    // }
    // switch (req.url) {
    //     case "/":
    //         {res.end("You are in Home Page");
    //     break;
    //         }
    //     case "/about":{res.end("Contacts us");
    //     break;
    //     }
    //     default:{res.statusCode=404;
    //     res.end("Page Not Found"); 
    //     }
    // }
 if (req.url==="/user" && req.method==="POST"){
    const user={
        name:"Rajneesh",
        age:22,
        branch:"CSE"
    }
    res.end(JSON.stringify(user))
    }
    else
        res.end("Not Found");
    }

)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});