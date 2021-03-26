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
// app.use(require('./routes')); 

// app.use('/HAROSS/movies', require('./routes/movies'));
app.use('/HAROSS/users', require('./routes/users'));
app.use('/HAROSS/loginConfirmacion', require('./routes/users'));
app.use('/HAROSS/loginMenus', require('./routes/users'));

app.get('/',(req,res)=>{
    res.send('Hello my friend of HAROSS');
})


app.post('/HAROSS/loginConfirmacion',(req,res)=>{
    res.send(require("./LoginKevinConfirmacion.json"));
});

app.post('/HAROSS/loginMenus',(req,res)=>{
    res.send(require("./LoginKevinMenus.json"));
});

app.post('/HAROSS/login',(req,res)=>{
    var parameters = req.query;
    console.log('Sparameters' ,parameters);

    if(parameters.userName == 'kcabanar' &&
       parameters.password =='pass123'){
        res.send(require("./LoginKevin.json"));
    }else if(
       parameters.userName == 'ggarciaq' &&
       parameters.password =='pass123'){
        // res.send(require("./LoginGuerel.json"));
        res.send(require("./LoginKevin.json"));
    }else if(
        parameters.userName == 'ecardenasa' &&
        parameters.password =='pass123'){
        //  res.send(require("./LoginErick.json"));
         res.send(require("./LoginKevin.json"));
    }else{
        var respuestaMala= [{
            respuesta: 0,
            mensaje :"Error al ingresar el usuario y/o password"
        }]
        res.send(respuestaMala);
    }
});



// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
