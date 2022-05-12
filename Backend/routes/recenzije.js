const express = require('express');
const { sequelize,Recension } = require('../models');
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));




route.post('/vratiRecenzije', (req, res) => {
    Recension.findAll({ where: { rodId: req.body.id }})
        .then( rec => res.json(rec))
        .catch( err => res.status(500).json(err) );
});

route.post('/vratiRecenzijeUser', (req, res) => {
    Recension.findAll({ where: { userId: req.body.id }})
        .then( rec => res.json(rec))
        .catch( err => res.status(500).json(err) );
});

route.post('/dodajRecenziju', (req, res) => {

    console.log(req.body);

     Recension.create(req.body).then( rows => {
       
         res.status(200).json("True");
 
     }).catch( err => res.status(500).json("Neuspesno dodavanje bloga!") );
 });



module.exports = route;