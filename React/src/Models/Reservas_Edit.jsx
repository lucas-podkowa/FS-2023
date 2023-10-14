import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom';
const animado = makeAnimated();


export class Internal_Reservas_Edit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            personas: [],
            vehiculo_id: null,
            evento_id: null,
            desde: new Date(),
            hasta: null
        }
    }

    componentDidMount() {

        //cargar los combos
        // por cada grupo de elementos tengo que hacer un fetch
        //this.setState({personas = result})
    }
    /*
    let datos = 
       {"datos" : {
           "vehiculo_id" : 2, 
           "evento_id" : 1, 
           "desde": "2023-11-02", 
           "hasta": "2023-11-04", 
           "finalizada": false, 
           "cancelada": false
           },
        "personas" : [1, 2]
        }

        1.	Cargar mis componentes (los select) utilizando sus respectivos Fetch (GET)
2.	Fabricar los handler de modo que mi componente react tenga en su estado aquello que cargué en el formulario
3.	Juntar los datos en una nueva variable que le permita enviar eso al backend
4.	Tendrán un handlesubmit donde tendrán que hacer un fetch al backend pero ahora es un POST (ej: http://localhost:8080/reserva) y dentro de ese fetch, en el body irán los datos que hice en el paso anterior

    */






    handleSubmit = (event) => {
        event.preventDefault()

        let reserva = {
            datos: {
                vehiculo_id: this.state.coche,
                evento_id: this.tate.evento,
            },
            personas: this.state.personas
        }
        let parametros = {
            method: this.props.params.vehiculo_id ? 'PUT' : 'POST',
            body: JSON.stringify(reserva),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const url = this.props.params.vehiculo_id ? `http://localhost:8080/vehiculo/${this.props.params.vehiculo_id}` : "http://localhost:8080/vehiculo"
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
                        this.props.navigate("/vehiculos")
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

    handleChangePersonas = (selectedOption) => {
        this.setState({ personas: selectedOption });
    }

    handleChangeEvento = (selectedOption) => {
        this.setState({ evento_id: selectedOption });
    }
    handleChangeVehiculo = (selectedOption) => {
        this.setState({ vehiculo_id: selectedOption });
    }
    handleChangeDesde = (fechaSeleccionada) => {
        this.setState({ desde: fechaSeleccionada });
    }
    handleChangeHasta = (fechaSeleccionada) => {
        this.setState({ hasta: fechaSeleccionada });
    }

    // handleChange = (event) => {
    //     this.setState({ [event.target.name]: event.target.value });
    // }

    render() {
        const personas = [
            { value: '1', label: 'Lucas' },
            { value: '2', label: 'Pepe' }
        ]
        const eventos = [
            { value: '1', label: 'Acto fin de Clases' },
            { value: '2', label: 'Entrega Certificados' }
        ]
        const coches = [
            { value: '1', label: 'Focus' },
            { value: '2', label: 'Ranger' }
        ]
        const espacio = <>&nbsp;</>;
        return (
            <div className='container'>
                <form action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="evento">Evento</label>
                    <Select
                        id='evento'
                        options={eventos}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={false}
                        closeMenuOnSelect={true}
                        components={animado}
                        onChange={this.handleChangeEvento}
                    ></Select>
                    <br />
                    <label htmlFor="vehiculo">Vehículo</label>
                    <Select
                        id='vehiculo'
                        options={coches}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={false}
                        closeMenuOnSelect={true}
                        components={animado}
                        onChange={this.handleChangeVehiculo}
                    ></Select>
                    <br />
                    <label htmlFor="personas">Personas Incluidas</label>
                    <Select
                        id='personas'
                        options={personas}
                        isMulti
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={false}
                        closeMenuOnSelect={false}
                        components={animado}
                        onChange={this.handleChangePersonas}
                    ></Select>
                    <br />
                    <div className='row'>
                        <div className="col-sm-4 col-md-3">
                            <label htmlFor="desde">Desde: {espacio}</label>
                            <DatePicker
                                id='desde'
                                selected={this.state.desde}
                                onChange={this.handleChangeDesde} //only when value has changed
                                dateFormat='dd/MM/yyyy'
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-sm-4 col-md-3">
                            <label htmlFor="hasta">Hasta:{espacio}</label>
                            <DatePicker
                                id='hasta'
                                selected={this.state.hasta}
                                onChange={this.handleChangeHasta} //only when value has changed
                                dateFormat='dd/MM/yyyy'
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                    <br />

                    <input className='btn btn-primary'
                        type="submit"
                        value="Guardar"
                    />

                </form>

            </div>
        )
    }
}



function Reservas_Edit() {
    const p = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Internal_Reservas_Edit navigate={navigate} params={p} />
        </>
    );
}

export default Reservas_Edit

// https://www.npmjs.com/package/react-select
// https://react-select.com/home
