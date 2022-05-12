
const express = require('express');
const { sequelize, Users, Recension} = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
   
    if (token == null) return res.redirect('/admin/login');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect('/admin/login');
        
        console.log(user);
        console.log(user.userId);
        req.user = user;
    
        next();
    });
}

function checkRole(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(user.role);
        if(user.role == "Moderator"){
            return res.redirect('/admin/mainpanel');
        }   
        next(); 
    });

   
}



app.get('/admin/mainpanel',authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/admin' });
});



app.get('/admin',authToken, (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});


app.get('/admin/login', (req, res) => {
    console.log("admin LOGIIN");
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin/korisnici',[authToken, checkRole], (req, res) => {
    res.sendFile('korisnik.html', { root: './static/admin' });
});


app.get('/admin/blogovi',authToken, (req, res) => {
    res.sendFile('blogovi.html', { root: './static/admin' });
});

app.get('/admin/akcije',authToken, (req, res) => {
    res.sendFile('akcije.html', { root: './static/admin' });
});

app.get('/admin/stapovi',authToken, (req, res) => {
    res.sendFile('stapovi.html', { root: './static/admin' });
});

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    //socket.use(authSocket);
    
    socket.on('rec', msg => {
        Recension.create(msg)
            .then( rows => {
                io.emit('rec', JSON.stringify(rows))
            }).catch( err => res.status(500).json(err) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});




const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);






server.listen({ port: process.env.PORT || 8000 }, async () => {
    await sequelize.authenticate();
});