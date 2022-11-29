import express from "express";
import mongoose from "mongoose";
import route from './Routes/route.js'
import session from 'express-session';
import cookieParser from 'cookie-parser'
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cookieParser())
app.use(session({resave:true, saveUninitialized:true, secret:'secret'}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//------------ mongoDB connect --------------
mongoose.connect('mongodb+srv://ankitg99641:mongo123@cluster0.zdrae.mongodb.net/dharam_digital?retryWrites=true&w=majority',{useNewUrlParser: true})
.then(()=>console.log('mongoDB is connected'))
.catch((err)=>console.log(err))

// ----  mongoose connection error and disconnection ---------
mongoose.connection.on('error', err=>{
    console.log('mongoose connection error',err.message)
})

mongoose.connection.on('disconnected', ()=>{
    console.log('mongoose connection disconnected .... ')
})

//------------ use routes --------------
app.use('/', route)

//------------ PORT running ----------------
const server = app.listen( PORT ,()=>{ console.log(`server running at PORT ${PORT}, on process id: ${process.pid}`)})

// --------- smooth closing server ----------
process.on('SIGINT',()=>{    // using ctrl + c
    console.log('SIGINT recieved');
    server.close(()=>{ 
        console.log('server is closed');
        mongoose.connection.close(false, ()=>{
            process.exit(0)    
        })
    })
})
process.on('SIGTERM',()=>{   // using kill + {process.pid}
    console.log('SIGTERM recieved');
    server.close(()=>{ 
        console.log('server is closed');
        mongoose.connection.close(false, ()=>{
            process.exit(0)    
        })   
    })
}) 