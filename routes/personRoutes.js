const router = require('express').Router();
const personRoutes = require('../models/Person');

// Create
router.post('/', async(require,response) => {
    const {name, lastname, salary, approved} = require.body;

    if(!name) {
        response.status(422).json({error: 'O nome é obrigatório!'});
        return
    }

    const person = {
        name,
        lastname,
        salary,
        approved
    }

    // Create mongoose

    try {
        await personRoutes.create(person);

        response.status(201).json({message: 'A pessoa foi inserida no sistema.'});
    } catch(error) {
        response.status(500).json({error: error});
    }
});

// Read - leitura dos dados
router.get('/', async(require, response)=> {
    try {
        const people = await personRoutes.find();

        response.status(200).json(people);
    } catch(error) {
        response.status(500).json({error: error});
    }
});

// Busca por ID
router.get('/:id', async(require, response) => {
    const id = require.params.id;

    try {
        const person = await personRoutes.findOne({_id: id});

        if(!person) {
            response.status(422).json({erro: 'Usuário não encontrado.'});
            return
        }

        response.status(200).json(person);
    } catch(error) {
        response.status(500).json({error: error});
    }
});

// Update - PUT, PATCH
router.patch('/:id', async(require, response) => {
    const id = require.params.id

    const { name, lastname, salary, approved} = require.body;

    const person = {
        name,
        lastname,
        salary,
        approved
    }

    try {
        const updatePerson = await personRoutes.updateOne({_id: id}, person);

        if(updatePerson.matchedCount === 0) {
            response.status(422).json({erro: 'Usuário não encontrado.'});
            return
        }

        response.status(200).json(person);

    } catch(error) {
        response.status(500).json({error: error});
    }
});

// Delete
router.delete('/:id', async(require, response) => {
    const id = require.params.id;

    const person = await personRoutes.findOne({_id: id});

    if(!person) {
        response.status(422).json({message: 'O usuário não foi encontrado!'});
        return
    }

    try {
        await personRoutes.deleteOne({_id: id});

        response.status(200).json({message: 'O usuário foi deletado com sucesso!'});
    } catch(error) {
        response.status(500).json({error: error});
    }
});

module.exports = router;