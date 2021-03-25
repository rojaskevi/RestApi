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
    res.send('Hello Word my friend of HAROSS');
})

app.get('/players',(req,res)=>{
    res.send(importData);
})

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
