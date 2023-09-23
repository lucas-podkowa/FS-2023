import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Vehiculos extends Component {
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
                console.log(result)
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

        const filas = this.state.vehiculos.map((vehiculo, index) => {
            return (
                <tr key={index}>
                    <td>{vehiculo.matricula}</td>
                    <td>{vehiculo.ano}</td>
                    <td>{vehiculo.modelo}</td>
                    <Link to={`/vehiculo/edit/${vehiculo.vehiculo_id}`} className='btn btn-primary'>
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </Link>
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
                </div>
            </>
        );

    }
}

export default Vehiculos