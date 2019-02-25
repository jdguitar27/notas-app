var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/', async (req, res) => {
    
    const { name, email } = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    try
    {
        const user = await User.create({
                name ,
                email,
                password: hashedPassword
            });
        res.status(200).send(user);
    }
    catch (err) 
    {
        res.status(500).send({
            mensaje:'Hubo un problema al intentar cargar la información en la base de datos',
            error: err.message
        });
    }
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', async (req, res) => {
    try
    {
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch(err)
    {
        res.status(500).send({
            message: "Hubo un problema al buscar los usuarios en la base de datos.",
            error: err.message
        });
    }
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', async (req, res) => {
    try
    {
        const user = await User.findById(req.params.id);
        if (!user) 
            res.status(404).send("No se pudo encontrar el usuario");
        res.status(200).send(user);
    }
    catch(err)
    {
        res.status(500).send({
            message: 'Hubo un problema al encontrar el usuario.',
            error: err.message
        });
    }
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', async (req, res) => {
    try
    {
        const user = await User.findOneAndDelete(req.params.id);
        if (!user) 
            res.status(404).send("No se pudo eliminar el usuario porque no existe.");
        res.status(200).send({
            message: "El usuario se eliminó satisfactoriamente.",
            deleted: user
        });
    }
    catch(err)
    {
        res.status(500).send({
            message: 'Hubo un problema al intentar eliminar el usuario.',
            error: err.message
        });
    }
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;