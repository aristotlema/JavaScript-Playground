require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// to create secret 

// require('crypto').randomBytes(64).toString('hex');

app.use(express.json());

const posts = [
    {
        username: 'Jim',
        title: 'Post 1'
    },
    {
        username: 'Steve',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // Split token at Bearer "token" and return the second part of that split
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
        
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

app.listen(3000, () => {
    console.log('Server running 3000');
});