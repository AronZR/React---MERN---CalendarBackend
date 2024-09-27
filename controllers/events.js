const { response } = require('express');
const evento = require('../models/evento');




const getEventos = async (req, res = response) => {

    const eventos = await evento.find().populate('user', 'name');

    res.json({
        ok: true,
        eventos 
    });

};

const crearEvento = async(req, res = response) => {

    const event = new evento(req.body);
    try {
        event.user = req.uid;
        const eventoGuardado = await event.save()

        res.json({
            ok: true,
            eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        })
    }
};

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
      
        const event = await evento.findById(eventoId)

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegios para editar este evento'
            });
        };

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            event: eventoActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    };


};

const eleminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
      
        const event = await evento.findById(eventoId)

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegios para eliminar este evento'
            });
        };

        await evento.findByIdAndDelete(eventoId);

        res.json({ ok: true })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    };
};

module.exports = {
    getEventos,
    crearEvento,
    eleminarEvento,
    actualizarEvento
}

