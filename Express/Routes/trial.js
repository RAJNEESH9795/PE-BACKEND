const express = require('express');
const app = express();
const PORT=8000;

// Application-level middleware
app.use((req, res, next) => {
    console.log('Middleware 1');
next(); 
});

app.use((req, res, next) => {
    console.log('Middleware 2');
next(); 
});
//mount on path

app.use('/student/id', (req, res, next) => {
    console.log("Response Type",req.method);
});

//Router Level Middleware
app.get('/student/:id', (req, res) => {
   console.log("Router Middleware");
});

app.use('/user/:id', (req, res, next) => {
    console.log("Requested URL:", req.url);
    next(); 
});

(req, res, next) => {
    console.log("Requested Type:", req.method);
    next();
}
app.listen(PORT, () => {
    console.log("Server Started");
});