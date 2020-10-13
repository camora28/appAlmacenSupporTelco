const express = require('express');
const router = express.Router();
// requiero la conexion a DB
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('./equiposTelco/add');
});

router.post('/add', async(req, res) => {
    const {Id_ActivoTx, Serial_EqTx, Mac_EqTx, Modelo_EqTx, Marca_EqTx,Description_EqTx, Propietario_EqTx, Ubicación_EqTx } = req.body;
    const newEquipoTx = {
        Id_ActivoTx, 
        Serial_EqTx, 
        Mac_EqTx, 
        Modelo_EqTx, 
        Marca_EqTx, 
        Description_EqTx, 
        Propietario_EqTx, 
        Ubicación_EqTx 
    }
    await pool.query('INSERT INTO equipostelco set ?', [newEquipoTx] );
    res.send('recivido');
});


module.exports = router;
