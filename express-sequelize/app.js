const express = require('express');
const Playlist = require('./models/playlist');
// const Sequelize = require ('sequelize');


const app = express();


app.get('/api/playlists', (req, res) => {
    Playlist.findAll().then((playlists) => {
        res.json(playlists)
    });
});

app.get('/api/playlists/:id', (req, res) => {
    let { id } = req.params;
    Playlist.findByPk(id).then((playlist) => {
        if(playlist) {
            res.json(playlist);
        } else {
            res.status(404).send();
        }
        
    });
});

// const testDBConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };
// testDBConnection();

app.listen(4000, () => console.log('Server started'));

