const Mensaje = require('../models/mensaje.model')
const Consulta = require('../models/enquiry.model')
const mongoose = require("mongoose");
addMensajes = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a mensaje',
        })
    }

    const mensaje = new Mensaje(body)

    if (!mensaje) {
        return res.status(400).json({ success: false, error: err })
    }

    mensaje
        .save()
        .then(async() => {
            try{
                let consultaObj = await Consulta.findById(req.body.consulta);
                console.log(req.body.consulta);
                consultaObj.mensajes.push(mensaje._id);
                consultaObj.save();
            }catch(error){
                console.log(error);
            }
            // let mensajeObj = await Mensaje.findById(mensaje._id);
            // mensajeObj.fecha=new Date();
            // mensajeObj.save();
            return res.status(201).json({
                success: true,
                id: mensaje._id,
                message: 'mensaje created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'mensaje not created!',
            })
        })
}

getMensajes = async (req, res) => {
    await Mensaje.find({'consulta': req.params.id}, (err, mensajes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mensajes.length) {
            return res
                .status(404)
                .json({ success: false, error: `mensajes not found` })
        }
        return res.status(200).json({ success: true, data: mensajes })
    }).catch(err => console.log(err))
}

module.exports = {
    addMensajes,
    getMensajes,
}