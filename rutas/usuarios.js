var ruta = require("express").Router();
const { where } = require("sequelize");
var {Usuario} = require('../conexion');

ruta.get("/", (req,res) => {
    Usuario.findAll({where:{status:1}})
    .then((data) => {
        //console.log(data);
        console.log("hgjhj...............................");
        res.render("mostrarUsr",{usuarios:data});
    })
    .catch((err) => {
        console.log("Error: " + err);
    });
    
});
ruta.get("/mostrarUsr", (req,res) => {
    res.render("mostrarUsr");
});
ruta.get("/nuevoUsr", (req,res) => {
    res.render("nuevoUsr");
});
ruta.post("/capturarUsuario", (req,res) => {
    Usuario.create(req.body)
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("No se pudo insertar el registro"+err);
        res.redirect("/");
    });
});

ruta.get("/editarUsuario/:id", (req,res) => {
    Usuario.findByPk(req.params.id)
    .then((usuario) => {
        res.render("modificarUsuario",{usuario:usuario});
    })
    .catch((err) => {
        console.log("Eror ... " + err);
        res.redirect("/");
    });

});
ruta.post("/modificarUsuario", (req,res) =>{
    Usuario.update(req.body,{where: {id:req.body.id}})// recuperar del formulario
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("Eror ................ "+err);
        res.redirect("/");
    });
});
ruta.get("/borrarUsuario/:id", (req,res) =>{
    Usuario.destroy({where:{id:req.params.id}})//recuperar del url
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Eror ................ "+err);
        res.redirect("/");
    });

});
ruta.get("/borrarUsuario2/:id", (req,res) =>{
    Usuario.update({status:0},{where: {id:req.params.id}})// recuperar del formulario
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("Eror ................ "+err);
        res.redirect("/");
    });
});
module.exports = ruta;
