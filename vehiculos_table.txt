import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export class Vehiculos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vehiculos: []
        }
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    
    // funcion ejecutada al montar el componente, tras ejecutarse el render, 
    // este metodo realiza un fetch al endpoint listar()
    // para traer el listado de vehiculos y setearlos en en estado "vehiculos"
    componentDidMount() {
        fetch("http://localhost:8080/vehiculo")
            .then(res => {
                return res.json()
                    .then(body => {

                        return {
                            status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body
                        };
                    })
            }).then(

                result => {
                    if (result.ok) {
                        this.setState({
                            vehiculos: result.body
                        });
                    } else {
                        toast.error(result.body.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );


    }

    // handler invocado mediante el evento onCLick() del boton eliminar en la tabla vehiculos
    // recibe como parametro a "vehiculo_id" y lo utilia para pegarle al delete del backend
    handleClickDelete(vehiculo_id) {
        let parametros = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        debugger
        fetch(`http://localhost:8080/vehiculo/${vehiculo_id}`, parametros)
            .then(res => {
                return res.json()
                    .then(body => {
                        return {
                            status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body
                        };
                    });
            }).then(
                result => {
                    if (result.ok) {
                        toast.success(result.body.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        this.componentDidMount();
                    } else {
                        toast.error(result.body.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }


    render() {
        const filas = this.state.vehiculos.map((vehiculo, index) => {
            return (
                <tr key={index}>
                    <td>{vehiculo.matricula}</td>
                    <td>{vehiculo.ano}</td>
                    <td>{vehiculo.modelo}</td>
                    <Link to={`/vehiculo/edit/${vehiculo.vehiculo_id}`} className='btn btn-primary'>
                        <span class="material-symbols-outlined">edit</span>
                    </Link>
                    <button className='btn btn-danger' onClick={() => this.handleClickDelete(vehiculo.vehiculo_id)}>
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </tr>
            )

        });
        return (
            <>
                <div className='container'>
                    <table className='table  table-striped'>
                        <thead>
                            <tr>
                                <th>Matricula</th>
                                <th>Año</th>
                                <th>Modelo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filas}
                        </tbody>
                    </table>
                    <br />
                    <Link to="/vehiculos/edit" className='btn btn-danger'>Nuevo Vehiculo</Link>
                </div>
            </>
        );

    }
}

export default Vehiculos