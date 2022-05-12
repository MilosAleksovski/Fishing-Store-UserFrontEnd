const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));




app.post('/api_login', (req, res) => {
    
    console.log(req.body.name);

    User.findOne({ where: { username: req.body.name } })
        .then( usr => {
           

            if (req.body.password == usr.password) {

                
                
                const obj = {
                    userId: usr.id,
                    user: usr.username,
                    role:usr.role,
                };
                console.log(obj);
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log(token);
                res.json({ token: token });
            } else {
                
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ msg: "No user in database"})
        });
});

app.listen({ port: process.env.PORT || 9000 }, async () => {
    await sequelize.authenticate();
});