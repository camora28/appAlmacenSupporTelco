const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


//Initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs ({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'layouts'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Global Variables
app.use((req, res, next) => {
    next();
})

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/EquiposTelco')); 


//Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting the servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


