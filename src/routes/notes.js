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
    const notifications = [];

    if(!title || title.trim() === "")
        notifications.push({message: 'Please write a title', type: 'danger'});
        
    if(!description || description.trim() === "")
        notifications.push({message: 'Please write a description', type: 'danger'});
    
    if(notifications.length > 0)  
        res.render('notes/new-note', {
            notifications,
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
            notifications.push({message: 'Note created successfully!', type: 'info'});
            req.flash('notifications', notifications);
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
    const { title, description } = req.body;
    const notifications = [];
    
    if(!title || title.trim() === "")
        notifications.push({message: 'The title can\'t be empty', type: 'danger'});
        
    if(!description || description.trim() === "")
        notifications.push({message: 'The description can\'t be empty', type: 'danger'});
    
    if(notifications.length > 0)
        res.render('notes/edit-note', {
            notifications,
            note: {
                _id: req.params.id,
                title,
                description
            }
        });
    else
    {
        try
        {
            const note = await Note.findByIdAndUpdate(req.params.id, { title, description});
            notifications.push({ message: 'Note updated successfully!', type: 'success' });
            req.flash('notifications', notifications);
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