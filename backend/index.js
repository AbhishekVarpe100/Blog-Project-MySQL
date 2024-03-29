const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require('path');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use(express.static('Public'))

const sqlconnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '',
    database: 'blog'
});

sqlconnection.connect((err) => {
    if (err) {
        console.log("Error in server")
    }
    else {
        console.log("Connected successfully");
    }
})



//register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    try {
        sqlconnection.query('select * from register where email=?', [email], (err, result) => {
            if (err) {
                console.log(err)
            }
            else if (result.length === 0) {
                sqlconnection.query('insert into register(name,email,password) values(?,?,?)', [name, email, password], (err, result) => {
                    if (err) {
                        res.status(500).send("Internal server error")
                    }
                    else {
                        res.status(200).json('register')
                    }
                })
            }
            else {
                res.json('present')
            }
        })

    } catch (error) {
        console.log(error)
    }
})


//login
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    try {
        sqlconnection.query('select name,password from register where name=? and password=?', [name, password], (err, result) => {
            if (result.length == 0) {
                res.status(500).json('not_find');
            }
            else {
                res.status(200).json('find');
            }
        })
    } catch (error) {
        console.log(error)
    }
})



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})



app.post("/addblog", upload.single('file'), (req, res) => {
    const username = req.body.username;
    const blogname = req.body.blogname;
    const description = req.body.description;
    const file = req.file.filename;
    sqlconnection.query('insert into createblog(username,blogname,description,image) values(?,?,?,?)',[username,blogname,description,file],(err,result)=>{
        if(err){
            res.status(500).send("Internal server error");
        }
        else{
            res.status(200).send('added');
        }
    })
})



//get single user blog
app.get('/getblog/:username',(req,res)=>{
    const u_name=req.params.username;
    try {
        sqlconnection.query('select * from createblog where username=?',[u_name],(err,result)=>{
            if(err){
                res.status(500).send("Internal server error")
            }
            else if(result.length>0){
                res.status(200).send(result)
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//get single user blog
app.get('/getblogs',(req,res)=>{
    try {
        sqlconnection.query('select * from createblog',(err,result)=>{
            if(err){
                res.status(500).send("Internal server error")
            }
            else if(result.length>0){
                res.status(200).send(result)
            }
        })
    } catch (error) {
        console.log(error);
    }
})


//delete blog

app.post('/deleteblog',(req,res)=>{
    const {id,username}=req.body;
    try {
        sqlconnection.query('delete from createblog where id=? and username=?',[id,username],(err,result)=>{
            if(err){
                res.status(500).send("Internal server error")
            }
            else{
                res.status(200).send('deleted')
            }
        })
    } catch (error) {
        console.log(error);
    }
})


// get single blog
app.post('/getblog/:id',(req,res)=>{
    const id=req.params.id;
    try {
        sqlconnection.query('select * from createblog where id=?',[id],(err,result)=>{
            if(err){
                res.status(500).send("Internal server error")
            }
            else{
                res.status(200).send(result[0])
            }
        })
    } catch (error) {
        console.log(error)
    }

})


//update blog
app.post("/update", upload.single('file'), (req, res) => {
    const blogname = req.body.blogname;
    const description = req.body.description;
    const file = req.file.filename;
    const id=req.body.id;
    sqlconnection.query('update createblog set blogname=?, description=?, image=? where id=?',[blogname,description,file,id],(err,result)=>{
        if(err){
            res.status(500).send("Internal server error")
        }
        else{
            res.status(200).send('updated');
        }
    })
})



    app.listen(5000, () => {
        console.log("Server started")
    })
