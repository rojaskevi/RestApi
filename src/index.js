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
// app.use('/HAROSS/users', require('./routes/users'));

app.get('/',(req,res)=>{
    res.send('Hello my friend of HAROSS');
})

app.post('/HAROSS/login',(req,res)=>{
    var confirmacionCorrecta= {
        respuesta: 1,
        mensaje :"Ingreso correctamente"
    };
    var parameters = req.query;
    if(parameters.userName == 'kcabanar' &&
       parameters.password =='pass123'){
        confirmacionCorrecta.UserId= 1;
        res.send(confirmacionCorrecta);
    }else if(
       parameters.userName == 'ggarciaq' &&
       parameters.password =='pass123'){
        confirmacionCorrecta.UserId= 2;
        res.send(confirmacionCorrecta);
    }else if(
        parameters.userName == 'ecardenasa' &&
        parameters.password =='pass123'){
        confirmacionCorrecta.UserId= 3;
         res.send(confirmacionCorrecta);
    }else{
        var respuestaMala= {
            UserId:0,
            respuesta: 0,
            mensaje :"Error al ingresar el usuario y/o password"
        }
        res.send(respuestaMala);
    }
});

app.get('/HAROSS/loginConfirmacion',(req,res)=>{
    var parameters = req.query;
    if(parameters.UserId == 1){        
        res.send(require("./LoginKevin.json"));
    }else if(
       parameters.UserId == 2){        
        res.send(require("./LoginGuerel.json"));
    }else if(
        parameters.UserId == 3){
        res.send(require("./LoginErick.json"));
    }
});

app.get('/HAROSS/loginMenus',(req,res)=>{
    var parameters = req.query;
    if(parameters.UserId == 1){        
        res.send(require("./LoginKevinMenus.json"));
    }else if(
       parameters.UserId == 2){
        res.send(require("./LoginGuerelMenus.json"));
    }else if(
        parameters.UserId == 3){
        res.send(require("./LoginErickMenus.json"));
    }    
});

app.get('/HAROSS/listaObservados',(req,res)=>{
    var parameters = req.query;
    if(parameters.documento != 0){
        var jsonInicial = require("./listaObservados.json");
        var jsonFiltrado = jsonInicial.filter(jsonInicial => jsonInicial.DOCUMENTO == parameters.documento);
        // var jsonFiltrado = jsonInicial.filter(jsonInicial => jsonInicial.DOCUMENTO.includes(parameters.documento));
        res.send(jsonFiltrado); 
    }else{
        res.send(require("./listaObservados.json")); 
    }    
});

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
