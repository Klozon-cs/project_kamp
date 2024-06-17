const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const multer = require('multer');

const server = app.listen(5600, () => {
    console.log("Server is running on http://localhost:5600");
});

// Use body-parser middleware to parse incoming requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views','./views');

//static routes 
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/views', express.static('./views'))
app.use('/public', express.static('./public'))

const route = require('./Routes/doc-route');
const { AsyncLocalStorage } = require('async_hooks');

app.use('/', route);












