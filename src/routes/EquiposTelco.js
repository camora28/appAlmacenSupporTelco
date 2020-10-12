const express = require('express');
const router = express.Router();
// requiero la conexion a DB
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('./equiposTelco/add');
});

router.post('/add', (req, res) => {
    console.log(req.body);
    res.send('recivido');
});


module.exports = router;
