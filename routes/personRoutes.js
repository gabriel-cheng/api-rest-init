const router = require('express').Router;

app.post('/person', async(require,response) => {
    const {name, lastname, salary, approved} = require.body;

    if(!name) {
        response.status(422).json({error: 'O nome é obrigatório!'});
    }

    const person = {
        name,
        lastname,
        salary,
        approved
    }

    // Create mongoose

    try {
        await Person.create(person);

        response.status(201).json({message: 'A pessoa foi inserida no sistema.'});
    } catch(erro) {
        response.status(500).json({error: error});
    }
});

module.exports = router;