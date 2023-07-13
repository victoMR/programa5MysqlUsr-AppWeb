var Sequelize = require("sequelize");

var usuarioModelo = require("./models/usuarios");

require("dotenv").config();

var db = process.env.BD_MYSQL || process.env.BD_MYSQL_LOCAL;

var usuario = process.env.USUARIO_MYSQL || process.env.USUARIO_MYSQL_LOCAL;

var password = process.env.PASSWORD_MYSQL || process.env.PASSWORD_MYSQL_LOCAL;

var host = process.env.HOST_MYSQL || process.env.HOST_MYSQL_LOCAL;

var port = process.env.PORT_MYSQL || process.env.PORT_MYSQL_LOCAL;


var conexion = new Sequelize(db, usuario, password, {
  host: host,
  port: port,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      sslmode: "require",
      rejectUnauthorized: true,
    },
  },
}); // creando un bojeto de sequalize
// var mysql2 = require("mysql2");

conexion.sync({ force: false }) // esta es una promesa
  .then(() => {
    console.log("Exito conectado a la base de datos :)");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos :(  " + err);
    console.log("Intenaremos conecin en localhost :) ");

    db = process.env.BD_MYSQL_LOCAL;

    usuario = process.env.USUARIO_MYSQL_LOCAL;

    password = process.env.PASSWORD_MYSQL_LOCAL;

    host = process.env.HOST_MYSQL_LOCAL;

    var port = process.env.PORT_MYSQL_LOCAL;
    conexion = new Sequelize(db, usuario, password, {
      host: host,
      port: port,
      dialect: "mysql"
    });
    conexion.sync({ force: false }) 
    .then(()=>{
      console.log("Existo estas en localhost");
    })
    .catch((err)=>{
      console.log("Error en localhost: " + err);
    });
  });

var Usuario = usuarioModelo(conexion);

module.exports = {
  Usuario: Usuario,
};
