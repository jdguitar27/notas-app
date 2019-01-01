const router = require('express').Router();

router.get('/users/singin', (req, res) => {
    res.send('<h1>Ingresando a la aplicación</h1>');
});

router.get('/users/singup', (req, res) => {
    res.send('<h1>Resgistrándose a la aplicación</h1>');
});

module.exports = router;