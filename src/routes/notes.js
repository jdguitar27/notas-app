const router = require('express').Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
    try
    {
        const notes = await Note.find();
        res.render('notes/all-notes', {notes});
    }
    catch(err)
    {
        console.log(err);
    }
});

router.get('/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if(!title)
        errors.push({message: 'Please write a title'});
        
    if(!description)
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
            console.log(note);

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

module.exports = router;