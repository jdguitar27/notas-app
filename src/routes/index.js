const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<h1>Index</h1>');
});

router.get('/about', (req, res) => {
    res.send('<h1>¿Quién Soy?</h1>');
});

module.exports = router;