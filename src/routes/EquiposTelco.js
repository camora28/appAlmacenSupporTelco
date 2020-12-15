const e = require('express');
const express = require('express');
const router = express.Router();
// requiero la conexion a DB
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('./equiposTelco/add');
});

//agregamos toda la informacion del formulario en base de datos
router.post('/add', isLoggedIn, async(req, res) => {
    const {Id_ActivoTx, Serial_EqTx, Mac_EqTx, Modelo_EqTx, Marca_EqTx,Description_EqTx, Propietario_EqTx, Ubicación_EqTx } = req.body;
    const newEquipoTx = {
        Id_ActivoTx, 
        Serial_EqTx, 
        Mac_EqTx, 
        Modelo_EqTx, 
        Marca_EqTx, 
        Description_EqTx, 
        Propietario_EqTx, 
        Ubicación_EqTx,
        user_id: req.user.id
    }
    console.log([Id_ActivoTx])
    const rowactivostx = await pool.query('SELECT * FROM equipostelco WHERE Id_ActivoTx = ?', [Id_ActivoTx]);
    
    console.log('||--- resultado de la consulta seleccionar todo desde equipostelco si el id activo es igual a Id_ActivoTx---||')
    console.log(rowactivostx);
    const errors = [];
    
    if (rowactivostx.length > 0) {
        const row1  = rowactivostx[0];  
        console.log('--fila encontrada:', row1);
        const validadando = row1.Id_ActivoTx === newEquipoTx.Id_ActivoTx;
        if(validadando) {
            errors.push({text: 'Id_Activo ya existe!'})
            console.log('datos duplicados:', validadando); 
           req.flash('message', 'Id_Activo ya existe!'); 
            res.render('./equiposTelco/add',{
                errors,
            Id_ActivoTx,
            Serial_EqTx,
            Mac_EqTx,
            Modelo_EqTx,
            Marca_EqTx,
            Description_EqTx,
            Propietario_EqTx,
            Ubicación_EqTx
            });                  
        }
    }else {
        console.log ('insertando datos:',[newEquipoTx] );
        pool.query('INSERT INTO equipostelco set ?', [newEquipoTx] );
        req.flash('success', 'Datos guardados satisfactoriamente');
        res.redirect('/equiposTelco');
    }         
});
//consultamos la todos los equipos de la base de datos
router.get('/', isLoggedIn, async(req, res) => {
    const equiposTelco = await pool.query('SELECT * FROM equipostelco WHERE user_id = ?',[req.user.id]);    
    res.render('equiposTelco/list', {equiposTelco});

    // res.send('listado de los equipos');
})

router.get('/delete/:Id_ActivoTx', isLoggedIn, async(req, res) => {
    const {Id_ActivoTx} = req.params;
    await pool.query('DELETE FROM equipostelco WHERE Id_ActivoTx = ?', [Id_ActivoTx]);
    req.flash('success','equipo eliminado satisfactoriamente!!');
    res.redirect('/equiposTelco');

})
router.get('/edit/:Id_ActivoTx', isLoggedIn, async(req, res) => {
    const {Id_ActivoTx} = req.params;
    const equipoTelco = await pool.query('SELECT * FROM equipostelco WHERE Id_ActivoTx = ?', [Id_ActivoTx]);
    console.log(equipoTelco[0]);
    res.render('../views/equiposTelco/edit',{equipoTelco: equipoTelco[0]});
})
router.post('/edit/:Id_ActivoTx', isLoggedIn, async(req, res) => {
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
