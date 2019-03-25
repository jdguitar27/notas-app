const router = require('express').Router();
const Note = require('../models/Note');

//Renderiza todas las notas cuando solicitan la ruta /notes
router.get('/', async (req, res) => {
    try
    {
        const notes = await Note.find().sort({date: 'desc'});
        res.render('notes/all-notes', {notes});
    }
    catch(err)
    {
        console.log(err);
    }
});

// Crea una nueva nota en la base de datos
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if(!title || title.trim() === "")
        errors.push({message: 'Please write a title'});
        
    if(!description || description.trim() === "")
        errors.push({message: 'Please write a description'});
    
    if(errors.length > 0)
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    else    
    {
        try
        {
            const note = await Note.create({
                    title ,
                    description
                });
            req.flash('success_msg', 'Note created successfuly!');
            res.redirect('/notes');
        }
        catch (err) 
        {
            res.status(500).send({
                mensaje:'Hubo un problema al intentar cargar la información en la base de datos',
                error: err.message
            });
        }
    }
});

router.put('/:id', async (req, res) => {        
    try
    {
        const { title, description } = req.body;
        const errors = [];
        
        if(!title || title.trim() === "")
            errors.push({message: 'The title can\'t be empty'});
            
        if(!description || description.trim() === "")
            errors.push({message: 'The description can\'t be empty'});
        
        if(errors.length > 0)
            res.render('notes/edit-note', {
                errors,
                note: {
                    _id: req.params.id,
                    title,
                    description
                }
            });
        else
        {
            const note = await Note.findByIdAndUpdate(req.params.id, { title, description});
            req.flash('success_msg', 'Note updated successfuly!');
            res.redirect('/notes');
        }    
    }    
    catch (err) 
    {
        res.status(500).send({
            mensaje:'Hubo un problema al intentar cargar la información en la base de datos',
            error: err.message
        });
    }
});

// Renderiza el formmulario de creación de notas
router.get('/add', (req, res) => {
    res.render('notes/new-note');
});

// Renderiza el formulario de edición de una nota
router.get('/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

module.exports = router;