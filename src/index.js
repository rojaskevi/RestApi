const express = require('express');
const morgan = require('morgan');
const app = express();
const importData = require("./inicio.json")
// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes')); 

app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));

app.get('/',(req,res)=>{
    res.send('Hello my friend of HAROSS');
})

app.get('/players',(req,res)=>{
    var parameters = req.query;
    if(parameters.userName == 'guerel' &&
       parameters.password =='pass123'){
        res.send(require("./Login.json"));
    }else{
        var respuestaMala= [{
            respuesta: 0,
            mensaje :"Error al ingresar el usuario y/o password"
        }]
        res.send(respuestaMala);
    }

   
})

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
