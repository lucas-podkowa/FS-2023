import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export class Vehiculos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vehiculos: [],
            modal: false
        }
        this.handleClickDelete = this.handleClickDelete.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    // funcion ejecutada al montar el componente, tras ejecutarse el render, 
    // este metodo realiza un fetch al endpoint listar()
    // para traer el listado de vehiculos y setearlos en en estado "vehiculos"
    componentDidMount() {

        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }



        fetch("http://localhost:8080/vehiculo", parametros)
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
                            vehiculos: result.body,
                            //siempre que se monta el componente el modal tiene que estar cerrado
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
    }

    closeModal() {
        this.setState({
            modal: false,
            idToDelete: null
        })
    }

    showModal(vehiculo_id) {

        this.setState({
            modal: true,
            idToDelete: vehiculo_id
        })
    }


    handleClickDelete() {
        let parametros = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        //this.state.idToDelete se carga cuando abrimos el modal con showModal(vehiculo_id)
        const url = `http://localhost:8080/vehiculo/${this.state.idToDelete}`
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
                        //al finalizar la eliminacion volvemos a invocar el componentDidMount() para recargar nuestro listado
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
                    <td>
                        <Link to={`/vehiculo/edit/${vehiculo.vehiculo_id}`} className='btn btn-primary'>
                            <span class="material-symbols-outlined">edit</span>
                        </Link>

                        <button className='btn btn-danger' onClick={() => this.showModal(vehiculo.vehiculo_id)}>
                            <span className="material-symbols-outlined">
                                delete
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
                    <Link to="/vehiculos/edit" className='btn btn-info'>Nuevo Vehiculo</Link>
                </div>

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmación de Eliminacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro de eliminar el vehiculo seleccionado?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.closeModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.handleClickDelete}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );

    }
}

export default Vehiculos



/*
¿cuál sería el orden de invocacion o llamado a funciones de un componente?
1. cotructor
2. render ()
3. componentDidMount()
    3.1 setState (){  colver a ejecutar el render()}
4. los llamados a proposito,  nuestras funciones  
n. componentWillUnmount()  

*/