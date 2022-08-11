// Configurações iniciais
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const router = require('./routes/personRoutes');

const personRoutes = require('./models/Person');
app.use('/person', personRoutes);

// mongodb+srv://gabrielcheng:<Mongo@M0NG0MYP455>@apicluster.ofx8mm4.mongodb.net/?retryWrites=true&w=majority

// Leitura de JSON / middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Rotas da API


// Rota inicial(endpoint)
app.get('/', (require, response) => {
    response.json({message: 'Você acessou a API'});
});

// Portas
mongoose.connect(
    'mongodb+srv://gabrielcheng:Mongo%40M0NG0MYP455@apicluster.ofx8mm4.mongodb.net/?retryWrites=true&'
).then(() => {
    console.log('Conectado ao MongoDB!');
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
        console.log(`Access: http://localhost:${port}`);
    });
}).catch((error) => {
    console.log(`Retornou um erro: ${error}`);
});
