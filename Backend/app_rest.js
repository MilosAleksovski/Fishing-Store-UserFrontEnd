const express = require('express');
const { sequelize, User, Blog,Sale,Rod } = require('./models');

const cors = require('cors');
const korisnici = require('./routes/korisnici');
const blogovi = require('./routes/blogovi');
const stapovi = require('./routes/stapovi');
const akcije = require('./routes/akcije');
const recenzije = require('./routes/recenzije');

require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/korisnici', korisnici);
app.use('/blogovi', blogovi);
app.use('/stapovi', stapovi);
app.use('/akcije', akcije);
app.use('/recenzije', recenzije);



app.listen({ port: process.env.PORT || 8020 }, async () => {
    await sequelize.authenticate();
});