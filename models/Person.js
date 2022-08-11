const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    lastname: String,
    salary: Number,
    approved: Boolean,
}); // Criando uma tabela chamando Person

module.exports = Person;