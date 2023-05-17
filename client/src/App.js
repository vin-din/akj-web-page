import React from 'react';
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Container from 'react-bootstrap/Container';

import Figure from 'react-bootstrap/Figure';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const noti = withReactContent(Swal)


function App() {

    const [icono, setIcono] = useState("");
    const [titulo, setTitulo] = useState("");
    const [duracion, setDuracion] = useState("");
    const [artista, setArtista] = useState("");
    const [genero, setGenero] = useState("");
    const [id, setId] = useState();

    const [editar, setEditar] = useState(false);

    const [cancionesList, setCanciones] = useState([]);


    const add = ()=>{
        Axios.post("http://localhost:3001/create",{
            icono:icono,
            titulo:titulo,
            duracion:duracion,
            artista:artista,
            genero:genero
        }).then(()=>{
            getCanciones();
            limpiarCampos();
            noti.fire({
                position: 'center',
                icon: 'success',
                title: "Registro exitoso.",
                html: "<i>La cancion <strong>" + titulo + " </strong>fue agregada con exito.</i>",
                showConfirmButton: false,
                timer: 1500
            })
        });
    }

    const update = ()=>{
        Axios.put("http://localhost:3001/update",{
            id:id,
            titulo:titulo,
            icono:icono,
            duracion:duracion,
            artista:artista,
            genero:genero
        }).then(()=>{
            getCanciones();
            limpiarCampos();
            noti.fire({
                position: 'center',
                icon: 'success',
                title: "Actualizacion existosa.",
                html: "<i>La cancion <strong>" + titulo + " </strong>fue actualizada con exito.</i>",
                showConfirmButton: false,
                timer: 1500
            })
        });
    }

    const deleteCancion = (val)=>{
        Axios.put("http://localhost:3001/delete",{
            id:val.id
        }).then(()=>{
            getCanciones();
            limpiarCampos();
            noti.fire({
                position: 'center',
                icon: 'success',
                title: "Borrado exitoso.",
                html: "<i>La cancion <strong>" + titulo + " </strong>fue borrada con exito.</i>",
                showConfirmButton: false,
                timer: 1500
            })
        });
    }

    const editarCancion = (val)=>{
        setEditar(true);

        setTitulo(val.titulo);
        setIcono(val.icono);
        setDuracion(val.duracion);
        setArtista(val.artista);
        setGenero(val.genero);
        setId(val.id);

    }

    const limpiarCampos = (val)=>{
        setEditar(false);
        setTitulo("");
        setIcono("");
        setDuracion("");
        setArtista("");
        setGenero("");

    }

    const getCanciones = ()=> {
        Axios.get("http://localhost:3001/canciones").then((response) => {
        setCanciones(response.data);
        });
    }

    getCanciones();


    return (
        <Container>
          <div className="App">

          </div>

          <div className="card text-center">
              <div className="card-header">
                  MyMusicList
              </div>

              <InputGroup className="mb-3" >
                  <InputGroup.Text id="basic-addon1">Titulo:</InputGroup.Text>
                  <Form.Control
                      placeholder="Ingrese el titulo."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="text"
                      value={titulo}
                      onChange={(event)=>{
                          console.log(event.target.value);
                          setTitulo(event.target.value);
                      }}
                  />
              </InputGroup>

              <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Icono:</InputGroup.Text>
                  <Form.Control
                      placeholder="Ingrese la direccion del icono."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="txt"
                      value={icono}
                      onChange={(event)=>{
                          setIcono(event.target.value);
                      }}
                  />
              </InputGroup>

              <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Duracion:</InputGroup.Text>
                  <Form.Control
                      placeholder="Ingrese la duracion."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="text"
                      value={duracion}
                      onChange={(event)=>{
                          setDuracion(event.target.value);
                      }}
                  />
              </InputGroup>

              <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Artista:</InputGroup.Text>
                  <Form.Control
                      placeholder="Ingrese el artista."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="text"
                      value={artista}
                      onChange={(event)=>{
                          setArtista(event.target.value);
                      }}
                  />
              </InputGroup>

              <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Genero:</InputGroup.Text>
                  <Form.Control
                      placeholder="Ingrese el genero."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="txt"
                      value={genero}
                      onChange={(event)=>{
                          setGenero(event.target.value);
                      }}
                  />
              </InputGroup>

              <div className="card-footer text-muted">
                  {
                      editar?
                          <div>
                              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                          </div>
                              :<button className='btn btn-success' onClick={add}>Registrar</button>

                  }

              </div>
          </div> <br/>

          <Table striped >
              <thead>
              <tr>
                  <th>id</th>
                  <th>Icono</th>
                  <th>Titulo</th>
                  <th>Duracion</th>
                  <th>Artista</th>
                  <th>Genero</th>
                  <th>Acciones</th>

              </tr>
              </thead>
              <tbody>
              {
                  cancionesList.map((val,key)=>{
                      return  <tr>
                          <th scope="row">{val.id}</th>
                          <td>
                              <Figure>
                                  <Figure.Image
                                      width={64}
                                      height={64}
                                      src={val.icono}
                                  />
                              </Figure>
                          </td>
                          <td>{val.titulo}</td>
                          <td>{val.duracion}</td>
                          <td>{val.artista}</td>
                          <td>{val.genero}</td>
                          <td>
                              <ButtonGroup aria-label="Basic example">
                                  <Button variant="secondary"
                                    onClick={()=>{
                                        editarCancion(val);
                                    }}>Editar</Button>
                                  <Button variant="secondary"
                                    onClick={()=>{
                                        deleteCancion(val);
                                    }
                                  }
                                  >Eliminar</Button>
                              </ButtonGroup>
                          </td>
                      </tr>



                  })
              }
              </tbody>
          </Table>
        </Container>
  );
}

export default App;
