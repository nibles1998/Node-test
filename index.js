const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
//----------------------------
const users = []; // DB
//----------------------------
server.get('/user', (req, res, next) => {
    res.status(200).json({
        success: true,
        users
    })
});

server.post('/user', (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            success: false,
            message: "name is require"
        });
        return;
    }

    users.push(name);
    res.status(200).json({
        success: true,
        message: "create successfully"
    });
})
server.delete('/user', (req, res, next) => {
    const { name } = req.body;
    let exist = false;
    users.some((_name, index) => {
        if (_name === name) {
            users.splice(index, 1);
            exist = true;
            return true;
        }
        return false;
    });
    return exist ? res.status(200).json({
        success: true,
        message: "user is deleted"
    }) : res.status(400).json({ success: false, message: "user not found" })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});