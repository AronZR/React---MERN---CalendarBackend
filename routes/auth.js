/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/ 
const {Router} = require('express');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();



router.post(
    '/new', 
    [// middlewares
        check('name', 'nombre es obligatorio').not().isEmpty(),
        check('email', 'email es obligatorio').isEmail(),
        check('password', 'paswword debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/',
    [// middlewares
        check('email', 'email es obligatorio').isEmail(),
        check('password', 'paswword debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken );


module.exports = router;