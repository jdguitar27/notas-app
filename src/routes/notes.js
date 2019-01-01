const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('<h1>NOtas de la app</h1>');
});

module.exports = router;