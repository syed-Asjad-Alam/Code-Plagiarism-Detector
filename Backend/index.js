const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
let cors = require("cors");
app.use(cors());

dotenv.config();


mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser : true}).then(()=>{
    console.log('connected to db '+ mongoose.connection.readyState )
}).catch(e => console.log(e));


app.get('/', (req,res)=>{
    res.send('Server Running')
})

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/teacher', require('../Backend/routes/teacher'))
app.use('/student', require('../Backend/routes/student'))

app.listen(4000, ()=>{
    console.log('Server Started')
})