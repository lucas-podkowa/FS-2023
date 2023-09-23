import React, { Component } from 'react'
import { useParams } from 'react-router-dom';

export class Gestion_Vehiculo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            marca_id: null,
            matricula: '',
            modelo: '',
            ano: null
        };
    };

    componentDidMount() { console.log(this.props) }

    handleSubmit = (event) => {
        event.preventDefault();
        //alert('se enviaron los datos de: ' + this.state.matricula);
        let datos = {
            marca_id: this.state.marca_id,
            matricula: this.state.matricula,
            modelo: this.state.modelo,
            ano: this.state.ano
        };

        let request = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        fetch("http://localhost:8080/vehiculo/", request)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    alert('exito');
                })
            .catch((error) => {
                console.log(error)
            });



        // fetch("http://localhost:8080/vehiculo/", request)
        //     .then(res => {
        //         try {
        //             res.json().then(
        //                 body => (
        //                     {
        //                         status: res.status,
        //                         ok: res.ok,
        //                         headers: res.headers,
        //                         body: body
        //                     }
        //                 )
        //             );
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     })
        //     .then(
        //         (result) => {
        //             if (result.ok) {
        //                 alert('exito');
        //             } else {
        //                 alert(result.body.message);
        //             }
        //         })
        //     .catch((error) => {
        //         console.log(error)
        //     });

    }

    handleChangeMarca = (event) => {
        this.setState({
            marca_id: event.target.value
        });
    }
    handleChangeMatricula = (event) => {
        this.setState({
            matricula: event.target.value,
        });
    }

    handleChangeModelo = (event) => {
        this.setState({
            modelo: event.target.value
        });
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h1>{this.props.params.vehiculo_id ? `Edicion del Vehiculo ${this.props.params.vehiculo_id}` : "Alta de Vehiculo"}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <form onSubmit={this.handleSubmit}>
                                <select className="form-select" id="marca" aria-label="Default select example"
                                    value={this.state.marca_id}
                                    onChange={this.handleChangeMarca}>
                                    <option selected disabled>Marca</option>
                                    <option value="1">Ford</option>
                                    <option value="2">Chevrolet</option>
                                </select>
                                <br />
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingModelo"
                                        placeholder="Modelo"
                                        value={this.state.modelo}
                                        onChange={this.handleChangeModelo}
                                    />
                                    <label for="floatingModelo">Modelo</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingMatricula"
                                        placeholder="Matricula"
                                        value={this.state.matricula}
                                        onChange={this.handleChangeMatricula}
                                    />

                                    <label for="floatingMatricula">Matricula</label>
                                </div>
                                <input
                                    type="submit"
                                    value="Guardar"
                                    onClick={this.handleSubmit} />
                            </form>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}


export function Vehiculo_Edit() {
    const p = useParams();
    return (
        <>
            <Gestion_Vehiculo params={p} />
        </>
    );
}
