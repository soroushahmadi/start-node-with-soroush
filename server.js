const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs'); // views-- is the default directory which express uses for our templates 


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append to server.log')
        }
    }); // lets you append on a file
    next();
}); // next exists so you can tell express when your middleware function is done. WHEB WE ARE DONE


// ***************************************************** ------------------------------------- *************************************************

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// }); // here we don't use next so the rest of our app stop being executed


// ***************************************************** ------------------------------------- *************************************************



app.use(express.static(__dirname + '/public')); // to use middlewares. app.use takes the middleware you wanna use


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to diamond shop website"
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});


app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
       pageTitle: 'portfolio',
       pageStart: 'my projects' 
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage : "unable to fullfil this request"
    });
});



app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});