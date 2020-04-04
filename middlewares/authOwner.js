module.exports = function(req,res,next) {
    if(req.mainObj && (req.mainObj._user  == req.user.id)) return next();

    //Si el usuario es propietario, solo el lo puede actualizar
    next(new Error('No tienes permisos para modifiar este registro'))
}