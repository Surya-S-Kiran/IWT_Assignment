const express=require("express");
const app=express();
let root=__dirname
const bodyparser=require("body-parser");



app.listen(8080,(err)=>{
        console.log("i am listen at 8080................");
})
app.get('/',(req,res)=>{
        // res.sendFile(root+'/index.html');
        // res.send("<p>jyoti is not good girl</p>")
        res.sendFile(root+'/loginpage.html')

})
//when method is get:
app.get('/login',(req,res)=>{
//        console.log(req.query.name);
//        console.log(req.query.DOB);
//        console.log(req.query.college);
//        console.log(req.query.email);
//        console.log(req.query.pass);
console.log(req.query.college);

})
//when method is post:
//parse the body::::
app.use(bodyparser.urlencoded({extended:true}));
// -------------
app.post('/login',(req,res)=>{
//         console.log(req.body.name);
//        console.log(req.body.DOB);
//        console.log(req.body.college);
//        console.log(req.body.email);
//        console.log(req.body.pass);  
console.log(req.body);

})

