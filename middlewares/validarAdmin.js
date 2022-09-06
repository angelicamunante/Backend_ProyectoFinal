const {request , response} = require('express');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {*} next 
 */
const validarAdmin = (req, res, next) => {
    const administrador = req.header("X-Admin-Token")
    if(administrador == true) {next();}
    else {res.status(403).send('Sin autorizacion')}
}

module.exports = validarAdmin;