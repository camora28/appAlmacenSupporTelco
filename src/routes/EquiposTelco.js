const express = require('express');
const router = express.Router();
// requiero la conexion a DB
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('./equiposTelco/add');
});

//agregamos toda la informacion del formulario en base de datos
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
    res.redirect('/equiposTelco');
});
//consultamos la todos los equipos de la base de datos
router.get('/', async(req, res) => {
    const equiposTelco = await pool.query('SELECT * FROM equipostelco');
    res.render('equiposTelco/list', {equiposTelco});

    // res.send('listado de los equipos');
})

router.get('/delete/:Id_ActivoTx', async(req, res) => {
    const {Id_ActivoTx} = req.params;
    await pool.query('DELETE FROM equiposTelco WHERE Id_ActivoTx = ?', [Id_ActivoTx]);
    res.redirect('/equiposTelco');

})
router.get('/edit/:Id_ActivoTx', async(req, res) => {
    const {Id_ActivoTx} = req.params;
    const equipoTelco = await pool.query('SELECT * FROM equipostelco WHERE Id_ActivoTx = ?', [Id_ActivoTx]);
    console.log(equipoTelco[0]);
    res.render('../views/equiposTelco/edit',{equipoTelco: equipoTelco[0]});
})

module.exports = router;
