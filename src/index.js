const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const app = express();

//////////////
// Settings //
//////////////

app.set( 'port', process.env.port || 3000 ); // Configura el puesto en el que escuchará la aplicación
app.set( 'views', path.join( __dirname, '/views' ) ); // Configura la dirección de las plantillas html
// Configurando motor de plantillas handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join( app.get( 'views' ), 'layouts' ),
    partialsDir: path.join( app.get( 'views' ), 'partials' ),
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

/////////////////
// Middlewares //
/////////////////

app.use(express.urlencoded( {extended: false} ));

// Global Variables

// Routes

// Static files

// Server is listening
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});