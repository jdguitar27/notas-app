//////////////
// Requires //
//////////////

const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const app = express();

//////////////
// Settings //
//////////////

require('./database');

app.set( 'port', process.env.port || 3000 ); // Configura el puerto en el que escuchará la aplicación
app.set( 'views', path.join( __dirname, '/views' ) ); // Configura la dirección de las plantillas html
// Configurando motor de plantillas handlebars
app.engine('.hbs', exphbs({
    defaultLayout:  'main',
    layoutsDir:     path.join( app.get( 'views' ), 'layouts' ),
    partialsDir:    path.join( app.get( 'views' ), 'partials' ),
    extname:        '.hbs'
}));
app.set('view engine', '.hbs')

/////////////////
// Middlewares //
/////////////////

app.use(express.urlencoded( {extended: false} ));
app.use(methodOverride('_method')); // Permitiendo el uso de method-override
// Activando y configurando las sesiones de express
app.use(session({
    secret: 'palabrasecreta',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//////////////////////
// Global Variables // 
//////////////////////
app.use((req, res, next) => {
    res.locals.notifications = req.flash('notifications');
    next();
});
////////////
// Routes //
////////////

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/notes', require('./routes/notes'));

//////////////////
// Static files //
//////////////////

app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////
// Server is listening //
/////////////////////////

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});