const express = require('express');
const app = express();

// Settings

app.set('port', process.env.port || 3000); // Configura el puesto en el que escuchará la aplicación

// Middlewares

// Global Variables

// Routes

// Static files

// Server is listening
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en ${app.get('port')}`);
});