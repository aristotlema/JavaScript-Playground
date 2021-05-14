const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const users = [
    {
        "name": "bill",
        "password": "$2b$10$dDf.6B6/RD4/S0aO73krSO/TDagkcXq.l8/PcIfnu7d0SlliOJNg6"
    }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt(10); // 10 rounds of hashing is default
        // // do not need to save salt, salt is stored in hashed password
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: req.body.name,
            password: hashedPassword
        };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if(user == null) {
        return res.status(400).send('Check the username');
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Not allowed');
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log('Server running on 3000');
});