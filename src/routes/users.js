const router = require('express').Router();

router.get('/singin', (req, res) => {
    res.send('<h1>Ingresando a la aplicación</h1>');
});

module.exports = router;