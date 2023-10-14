import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jwt_decode from "jwt-decode";



export class Reservas extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reservas: [],
            personas_x_reservas: [],
            modal: false,
            ids: []
        }
    }

    componentDidMount() {
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        fetch("http://localhost:8080/reserva", parametros)
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
                            reservas: result.body,
                            modal: false
                        });
                        // hago un recorrido de las respuestas para guardar solamente la reserva_id de cada reserva en otro array
                        // ese array lo asigno al estado ids, me servirá despues para traer las personas de cada reserva
                        let ids_reservas = [];
                        for (const res of result.body) {
                            ids_reservas.push(res.reserva_id);
                        }

                        // si lo anterior salio bien significa que en "ids_reservas" tengo solamente los reserva_id de las que estan activas
                        // ahora puedo hacer un nuevo fetch buscando esas personas desde la tabla personas_x_reserva
                        // aca iniciamos nuestro segundo fetch en cascada
                        let parametros = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': sessionStorage.getItem('token'),
                                'reservas': ids_reservas
                            }
                        }
                        fetch("http://localhost:8080/reserva/personas", parametros)
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
                                            personas_x_reservas: result.body,
                                            modal: false
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


    handleClickCancelar = () => {
        let parametros = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const url = `http://localhost:8080/reserva/cancelar/${this.state.idToDelete}`
        fetch(url, parametros)
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
    closeModal = () => {
        this.setState({
            modal: false,
            idToDelete: null
        })
    }

    showModal = (reserva_id) => {
        this.setState({
            modal: true,
            idToDelete: reserva_id
        })

    }

    convertirFecha = (date) => {
        const fecha = new Date(date);
        const dia = fecha.getUTCDate().toString().padStart(2, '0');
        const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getUTCFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    render() {
        const filas = this.state.reservas.map((reserva, index) => {

            const personasEnReserva = this.state.personas_x_reservas
                .filter(persona => persona.reserva_id === reserva.reserva_id)
                .map(persona => persona.agente)
                .join(', ');

            //es lo mismo que hacer lo siguiente
            // let personasEnReserva = []
            // for (const persona of this.state.personas_x_reservas) {
            //     if (reserva.reserva_id == persona.reserva_id) {
            //         personas_en_reserva.push(persona.agente)
            //     }
            // }

            return (
                <tr key={index}>
                    <td>{reserva.evento}</td>
                    <td>{reserva.vehiculo_desc}</td>
                    <td>{this.convertirFecha(reserva.desde)}</td>
                    <td>{this.convertirFecha(reserva.hasta)}</td>
                    <td>{personasEnReserva}</td>
                    <td>
                        <Link to={`/reservas/edit/${reserva.reserva_id}`} className='btn btn-outline-primary btn-sm'>
                            <span className="material-symbols-outlined">edit</span>
                        </Link>

                        <button className='btn btn-outline-danger btn-sm' onClick={() => this.showModal(reserva.reserva_id)}>
                            <span className="material-symbols-outlined">
                                cancel
                            </span>
                        </button>
                        <button className='btn btn-outline-success btn-sm' >
                            <span className="material-symbols-outlined">
                                no_crash
                            </span>
                        </button>
                    </td>

                </tr>
            )

        });

        return (
            <>
                <div>
                    <table className='table  table-striped'>
                        <thead>
                            <tr>
                                <th>Evento</th>
                                <th>Vehiculo</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                                <th>Personas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filas}
                        </tbody>

                    </table>
                    <br />
                    <Link to="/reservas/edit" className='btn btn-info'>Nueva Reserva</Link>
                </div>

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cancelación de Reserva</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro/a de cancelar la reserva seleccionada?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.closeModal}>
                            Volver
                        </Button>
                        <Button variant="primary" onClick={this.handleClickCancelar}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


// https://www.npmjs.com/package/react-select
// https://react-select.com/home
export default Reservas