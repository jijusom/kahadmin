const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const flash = require ('connect-flash');
const session = require('express-session');
const passport = require('passport');
//Body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//EJS
app.set('view engine','ejs');
//PATH
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
//Express Session
app.use(session({
    secret: 'ayurvedam',
    resave: false,
    saveUninitialized: true
  }))
  //Passport 
  app.use(passport.initialize());
  app.use(passport.session());
  //connect flash
  app.use(flash());

  //Global Variables
  app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next ();
  });

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/home', require('./routes/home'));

const PORT = process.env.PORT||5000;

app.listen(PORT, console.log('Server started on ' + PORT ));


