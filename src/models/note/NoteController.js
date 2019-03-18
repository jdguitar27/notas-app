var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Note = require('../Note');

// CREATES A NEW Note
router.post('/', async (req, res) => {
    
    const { title, description } = req.body;
    try
    {
        const note = await Note.create({
                title ,
                description
            });
        res.status(200).send(note);
    }
    catch (err) 
    {
        res.status(500).send({
            mensaje:'Hubo un problema al intentar cargar la información en la base de datos',
            error: err.message
        });
    }
});

// RETURNS ALL THE NoteS IN THE DATABASE
router.get('/', async (req, res) => {
    try
    {
        const notes = await Note.find({});
        res.status(200).send(notes);
    }
    catch(err)
    {
        res.status(500).send({
            message: "Hubo un problema al buscar las notas en la base de datos.",
            error: err.message
        });
    }
});

// GETS A SINGLE Note FROM THE DATABASE
router.get('/:id', async (req, res) => {
    try
    {
        const note = await Note.findById(req.params.id);
        if (!note) 
            res.status(404).send("No se pudo encontrar la nota.");
        res.status(200).send(note);
    }
    catch(err)
    {
        res.status(500).send({
            message: 'Hubo un problema al encontrar la nota.',
            error: err.message
        });
    }
});

// DELETES A Note FROM THE DATABASE
router.delete('/:id', async (req, res) => {
    try
    {
        const note = await Note.findOneAndDelete(req.params.id);
        if (!note) 
            res.status(404).send("No se pudo eliminar la nota porque no existe.");
        res.status(200).send({
            message: "La nota se eliminó satisfactoriamente.",
            deleted: note
        });
    }
    catch(err)
    {
        res.status(500).send({
            message: 'Hubo un problema al intentar eliminar la nota.',
            error: err.message
        });
    }
});

// UPDATES A SINGLE Note IN THE DATABASE
router.put('/:id', async (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Note) {
        if (err) return res.status(500).send("There was a problem updating the Note.");
        res.status(200).send(Note);
    });
});


module.exports = router;