const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 4000);

const db = mysql.createConnection({
    host: process.env.host || "localhost",
    user:process.env.user || "root",
    password: process.env.pswd || "",
    database: process.env.data || "canciones_crud",
    port: process.env.portA || 3306

});

app.post("/create",(req,res)=>{
    const icono = req.body.icono;
    const titulo = req.body.titulo;
    const duracion = req.body.duracion;
    const artista = req.body.artista;
    const genero = req.body.genero;

    db.query('INSERT INTO canciones(icono,titulo,duracion,artista,genero) VALUES(?,?,?,?,?)',[icono,titulo,duracion,artista,genero],
        (err,result)=>{
            if(err){
                res.send(err);
            }else {
                res.send("Cancion registrada con exito!!.")
            }
        }
        );

});

app.get("/canciones",(req,res)=>{
    db.query('SELECT * FROM canciones',
        (err,result)=>{
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        }
    );

});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const icono = req.body.icono;
    const titulo = req.body.titulo;
    const duracion = req.body.duracion;
    const artista = req.body.artista;
    const genero = req.body.genero;
    db.query('UPDATE canciones SET icono=?,titulo=?,duracion=?,artista=?,genero=? WHERE id=?',[icono,titulo,duracion,artista,genero,id],
        (err,result)=>{
            if(err){
               res.send(err);
            }else {
                res.send("Cancion actualizado con exito!!.")
            }
        }
    );
});

app.put("/delete",(req,res)=>{
    const id = req.body.id;

    db.query('DELETE FROM canciones WHERE id=?',[id],
        (err,result)=>{
            if(err){
                res.send(err);
            }else {
                res.send("Cancion eliminado con exito!!.")
            }
        }
    );
});

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});