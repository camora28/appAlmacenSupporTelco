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
    req.flash('success', 'Datos guardados satisfactoriamente');
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
    req.flash('success','equipo eliminado satisfactoriamente!!');
    res.redirect('/equiposTelco');

})
router.get('/edit/:Id_ActivoTx', async(req, res) => {
    const {Id_ActivoTx} = req.params;
    const equipoTelco = await pool.query('SELECT * FROM equipostelco WHERE Id_ActivoTx = ?', [Id_ActivoTx]);
    console.log(equipoTelco[0]);
    res.render('../views/equiposTelco/edit',{equipoTelco: equipoTelco[0]});
})
router.post('/edit/:Id_ActivoTx', async(req, res) => {
    const {Id_ActivoTx} = req.params;
    const {Serial_EqTx, Mac_EqTx, Modelo_EqTx, Marca_EqTx,Description_EqTx, Propietario_EqTx, Ubicación_EqTx } = req.body;
    const editEquipoTelco = { 
        Serial_EqTx, 
        Mac_EqTx, 
        Modelo_EqTx, 
        Marca_EqTx, 
        Description_EqTx, 
        Propietario_EqTx, 
        Ubicación_EqTx
    };
    console.log(editEquipoTelco);
    await pool.query('UPDATE equipostelco set ? WHERE Id_ActivoTx = ?', [editEquipoTelco, Id_ActivoTx]);
    req.flash('success','equipo actualizado satisfactoriamente!!')
    res.redirect('/equiposTelco');
})

module.exports = router;
