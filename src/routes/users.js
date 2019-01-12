const router = require('express').Router();

router.get('/users/singin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

module.exports = router;