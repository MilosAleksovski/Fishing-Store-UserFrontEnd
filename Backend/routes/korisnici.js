const express = require('express');
const { sequelize, User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Joi = require('joi'); 


const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schemaUpdate = Joi.object().keys({ 

    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','rs'] } }),
    username: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(2).max(20).required(),
    role: Joi.string().valid('Korisnik').required(),
    
});
const schemaCreate = Joi.object().keys({ 
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','rs'] } }),
    username: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(2).max(20).required(),
    role: Joi.string().valid('Admin','Moderator').required(),
    
});

route.get('/vratiKorisnike', (req, res) => {
    User.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/getUser', (req, res) => {
   
    let usr = null;
    jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        
        usr = user.userId ;
    
    });
    
    User.findOne({ where: { id: usr} })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json("Uneti id ne postoji u bazi podataka!") );
 });
 route.post('/getUserById', (req, res) => {
    console.log(req.body);
    User.findOne({ where: { id: req.body.id} })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json("Uneti id ne postoji u bazi podataka!") );
 });


route.post('/dodajKorisnika', (req, res) => {
   const validate = schemaUpdate.validate(req.body);


   if(validate.error != null){
       
       res.status(400).json(validate.error.details[0].message);
       return;
   }

    User.create(req.body).then( rows => {
        
        
        const obj = {
            userId: rows.id,
            user: rows.username,
            role:rows.role,
        };
        console.log(obj);
        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json("Username or email already exist") );
});

route.delete('/obrisiKorisnika', (req, res) => {
    console.log(req.body.id);
    User.destroy({ where: { id: req.body.id} })
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json("Uneti id ne postoji u bazi podataka!") );
});


route.put('/updateKorisnika', (req, res) => {
    
    
   const validate = schemaUpdate.validate(req.body);


   if(validate.error != null){
       
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

   
    User.update(
        { 
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            username:req.body.username,
            role:req.body.role
            
        },
      
        {where: { id: req.body.id}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json("Username or email already exist") );
   
  

});


module.exports = route;