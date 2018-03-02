const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


// by default it will look for the view folder. but we change that using
//app.set('views', path.join(...)) 
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getFullYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('scream', (text)=>{
    return text.toUpperCase();
});



app.use((req, res, next)=>{

    var now = new Date().toString();
    var log = req.path + req.method + req.url;
    fs.appendFile('server.log',log+'\n', (err)=>{
        if(err)
        {
            console.log('Error in Server.js Line 31');
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next)=>{
    
//     res.render('maintainance.hbs',{
//         pageTitle: 'Maintainance Page'
//     });
// });

app.use(express.static( __dirname +'/public'));
app.get('/',(req, res)=>{

    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Hurray You Made IT.'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on Port 3000');
});

app.get('/about',(req, res)=>{ 

    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req, res)=>{

    res.send({
        error: 'Error'
    });
});