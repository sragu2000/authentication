const express=require("express");
const mysql=require("mysql");
const app=express();
const cors= require("cors");
app.use(express.json());
app.use(cors());
const PORT=3001;

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"reactdb"
});

app.post("/register",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    db.query(
        "INSERT INTO users (username,password) values (?,?)",
        [username,password],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            // by printing console.log(result) we can get response packet
            if(result.affectedRows>=1){
                res.send({result:true, message:"Signup Success"});
            }else{
                res.send({result:false, message:"Signup Failed"});
            }
        }
    )
})

app.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    db.query(
        "select * from users where username=? and password=?",
        [username,password],
        (err,result)=>{
            if(err){
                res.send({result:false, message:err});
            }
            if(result.length>0){
                //selected row will be available in result variable
                // res.send({result:true, message:result});
                // console.log(result);
                res.send({result:true, message:result});
            }else{
                res.send({result:false, message:"No users found"});
            }
        }
    )
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});