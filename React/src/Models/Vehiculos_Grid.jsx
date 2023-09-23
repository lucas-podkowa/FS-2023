import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Vehiculos_Grid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vehiculos: []
        }
    }



    componentDidMount() {

        fetch("http://localhost:8080/vehiculo/")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    vehiculos: result
                });
            },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    // this.setState({
                    //     error
                    // });
                }
            )
    }




    render() {

        const mostrar = this.state.vehiculos.map((vehiculo, index) => {
            return (
                <div className='row' key={index}>
                    <div className='col'>
                        <strong>Matricula: </strong><span>{vehiculo.matricula}</span><br />
                        <strong>Año: </strong><span></span>{vehiculo.ano}<br />
                        <strong>Modelo: </strong><span>{vehiculo.modelo}</span><br />
                        <Link to={`/vehiculo/edit/${vehiculo.vehiculo_id}`} className='btn btn-primary'>
                            <span class="material-symbols-outlined">
                                edit
                            </span>
                        </Link>
                        <hr />
                    </div>
                </div>

            )
        });
        return (
            <>
                <div className='container'>
                    {mostrar}
                </div>
                <br />
                <Link to="/vehiculos/edit" className='btn btn-danger'>Nuevo Vehiculo</Link>
            </>
        );

    }
}

export default Vehiculos_Grid

//  <Link to="/vehiculos/edit" className='btn btn-danger'></Link>

