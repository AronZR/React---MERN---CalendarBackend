/*
    Rutas de Eventos / Events
    host + /api/Events
*/ 

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eleminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT);

// Ontener Eventos
router.get(
    '/', 
    getEventos 
);

//Crear Evento
router.post(
    '/create',
    [
        check('title', 'titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

// actualizar evento
router.put('/:id',  actualizarEvento);

// Borrar evento
router.delete('/:id', eleminarEvento);

module.exports = router;