const express = require('express')
const mongoose = require('mongoose')


//initiate express app
const app = express();

//express bodyparser
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json())


const uri = 'mongodb+srv://Oluwatomisin:Enitanmongo@mongodbintro.ude0k.mongodb.net/userAuth?retryWrites=true&w=majority';
//db connecct
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => console.log("db connection success"))
    .catch((error) => console.log(error))
    //bring in routes
const authRoute = require('./routes/authRoute')
    //use routes
app.use(authRoute);


app.listen(5000, console.log('listening to port 5000'))