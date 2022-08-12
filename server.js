// Configurações iniciais
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


// Leitura de JSON / middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Rota inicial(endpoint)
app.get('/', (require, response) => {
    response.json({message: 'Você acessou a API'});
});

// Portas
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ofx8mm4.mongodb.net/?retryWrites=true&`
).then(() => {
    console.log('Conectado ao MongoDB!');
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
        console.log(`Access: http://localhost:${port}`);
    });
}).catch((error) => {
    console.log(`Retornou um erro: ${error}`);
});
