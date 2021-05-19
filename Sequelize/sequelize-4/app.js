const { sequelize, User, Post } = require('./models');
const express = require('express');
const app = express();

app.use(express.json());
// Get All
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get by Id
app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ 
            where: { uuid: uuid},
            include: 'posts'
        });
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// EDIT USER
app.put('/users/:uuid', async (req, res) => {
    const { uuid } = req.params;
    console.log(uuid);
    const { name, email, role } = req.body;
    try {
        const user = await User.findOne({ where: { uuid: uuid} });
        user.name = name;
        user.email = email;
        user.role = role;

        await user.save();
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// DELETE USER
app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        await User.destroy({
            where: { uuid: uuid }
        });
        return res.json({ message: "deleted user" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Create - User
app.post('/users', async (req, res) => {
    const { name, email, role } = req.body;

    try{
        const user = await User.create({ name, email, role });
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

// Create - Post
app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body;
    try{
        const user = await User.findOne({ where: { uuid: userUuid }});
        const post = await Post.create({ body, userId: user.id })
        return res.json(post);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//get all posts
app.get('/posts', async (req, res) => {
    try{
        // if multiple assocaintes are need for query: include: ['user', 'post'] 
        const posts = await Post.findAll({ include: 'user' });
        return res.json(posts);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


app.listen({ port: 5000 }, async () => {
    console.log('server running on 5000');
    try{
        await sequelize.authenticate();
        console.log('database connected');
    } catch (err) {
        console.log('connection to database failed', err);
    }
});

//app.listen({ port: 5000 }, async () => {
//     console.log('server running on 5000');
//     await sequelize.sync({ force: true });
//     console.log('database synced!');
// });
    

    
