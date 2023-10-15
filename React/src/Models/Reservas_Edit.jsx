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
            eventos: [],
            personas: [],
            personasSeleccionadas: [],
            vehiculos: [],
            vehiculo_id: null,
            evento_id: null,
            desde: new Date(),
            hasta: null,
            reservaSeleccionada: null
        }
    }
    //elemento utilizado en los mensajes, lo escribo una sola vez para no repetir todo en cada fetch
    configTosti = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    componentDidMount() {

        this.fetchEventos();
        this.fetchVehiculos();
        this.fetchPersonas();
        if (this.props.params.reserva_id) {
            this.fetchReserva();
        }
    }

    fetchReserva() {
        fetch(`http://localhost:8080/reserva/buscar/${this.props.params.reserva_id}`)
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
            })
            .then(
                result => {
                    if (result.ok) {
                        this.setState({ reservaSeleccionada: result.body.detail });
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            )
            .catch(error => console.error('Error en la primera petición:', error));
    }

    fetchEventos() {
        fetch('http://localhost:8080/evento')
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
            })
            .then(
                result => {
                    if (result.ok) {
                        this.setState({ eventos: result.body });
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            )
            .catch(error => console.error('Error en la primera petición:', error));
    }

    fetchVehiculos() {
        fetch('http://localhost:8080/vehiculo')
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
            })
            .then(
                result => {
                    if (result.ok) {
                        this.setState({ vehiculos: result.body });
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            )
            .catch(error => console.error('Error en la primera petición:', error));
    }

    fetchPersonas() {
        fetch('http://localhost:8080/persona')
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
            })
            .then(
                result => {
                    if (result.ok) {
                        this.setState({ personas: result.body });
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            )
            .catch(error => console.error('Error en la primera petición:', error));
    }




    handleSubmit = (event) => {
        event.preventDefault()

        let reserva = {
            datos: {
                vehiculo_id: this.state.vehiculo_id,
                evento_id: this.state.evento_id,
                desde: this.state.desde,
                hasta: this.state.hasta,
            },
            personas: this.state.personasSeleccionadas
        }
        let parametros = {
            method: this.props.params.reserva_id ? 'PUT' : 'POST',
            body: JSON.stringify(reserva),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const url = this.props.params.reserva_id
            ? `http://localhost:8080/reserva/${this.props.params.reserva_id}`
            : "http://localhost:8080/reserva"
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
                        toast.success(result.body.message, this.configTosti);
                        this.props.navigate("/reservas")
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }

    handleChangePersonas = (selectedOption) => {
        this.setState({ personasSeleccionadas: selectedOption });
    }
    handleChangeEvento = (selectedOption) => {
        this.setState({ evento_id: selectedOption.value });
    }
    handleChangeVehiculo = (selectedOption) => {
        this.setState({ vehiculo_id: selectedOption.value });
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
        //--- con los datos optenidos por los fetch, armamos los arreglos para cargar los select ---
        //------------------------------------------------------------------------------------------

        // --> se puede hacer con un if con un forOf o...
        // var coches = [];
        // if (this.state.vehiculos.length > 0) {
        //     for (const vehiculo of this.state.vehiculos) {
        //         coches.push({ value: vehiculo.vehiculo_id, label: vehiculo.vehiculo_desc });
        //     }
        // }

        // --> utilizando map:

        const vehiculos = this.state.vehiculos || [];
        const coches = vehiculos.map(vehiculo => ({
            value: vehiculo.vehiculo_id,
            label: vehiculo.vehiculo_desc
        }));

        const evts = this.state.eventos || [];
        const eventos = evts.map(evento => ({
            value: evento.evento_id,
            label: `${evento.nombre} (${evento.lugar})`
        }));

        const pers = this.state.personas || [];
        const personas = pers.map(persona => ({
            value: persona.persona_id,
            label: `${persona.apellido} ${persona.nombre}`
        }));

        // var sel = {}
        // if (this.state.reservaSeleccionada !== "" && this.state.reservaSeleccionada !== null) {
        //     if (this.state.eventos !== "" && this.state.eventos !== null) {
        //         let evt = this.state.eventos.filter(evento => evento.evento_id === this.state.reservaSeleccionada.evento_id);
        //         sel = { "value": this.state.reservaSeleccionada.evento_id, "label": evt[0].nombre }
        //     }
        // }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

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

            </div >
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
