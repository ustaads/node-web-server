const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;

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
    var log = now +req.path + req.method + req.baseUrl ;
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



app.listen(port,()=>{
    console.log(`Server is up on Port ${port}...`);
});

app.get('/about',(req, res)=>{ 

    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/project',(req, res)=>{

    res.render('project.hbs',{
        pageTitle:'Projects'
    });

});

app.get('/bad',(req, res)=>{

    res.send({
        error: 'Error'
    });
});