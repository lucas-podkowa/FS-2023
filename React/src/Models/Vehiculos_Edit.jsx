import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';



export class Internal_Vehiculos_Edit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            marca_id: null,
            matricula: '',
            modelo: '',
            ano: null
        }
    }

    // como utilizamos el mismo formulario para crear y actualizar vehiculos, si no vinene ningun parametro significa que es un ALTA
    // pero si viene "vehiculo_id" por parametro (dentro de las props del constructor) significa que es una MODIFICACION
    // por lo que aprovechamos el ciclo de vida del componente para realizar un fetch al backend y traer los datos del vehiculo a ser
    // modificado si es que viene dicho dato por parametro
    componentDidMount() {

        if (this.props.params.vehiculo_id) {
           
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
           
            fetch(`http://localhost:8080/vehiculo/${this.props.params.vehiculo_id}`, parametros)
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
                                marca_id: result.body.marca_id,
                                matricula: result.body.matricula,
                                modelo: result.body.modelo,
                                ano: result.body.ano
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
    }

    // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
    // eso lo diferenciamos mediante "this.props.params.vehiculo_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch
    handleSubmit = (event) => {
        event.preventDefault()

        let vehiculo = {
            marca_id: this.state.marca_id,
            matricula: this.state.matricula,
            modelo: this.state.modelo,
            ano: this.state.ano
        }

        let parametros = {
            method: this.props.params.vehiculo_id ? 'PUT' : 'POST',
            body: JSON.stringify(vehiculo),
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
        
        this.props.navigate("/vehiculos")
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.params.vehiculo_id ? `Edicion del Vehiculo ${this.props.params.vehiculo_id}` : "Alta de Vehiculo"}</h1>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>

                        <form onSubmit={this.handleSubmit}>
                            <select className="form-select"
                                id="marca"
                                aria-label="Default select example"
                                onChange={this.handleChange}
                                value={this.state.marca_id}
                                name='marca_id'
                            >
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
                                    onChange={this.handleChange}
                                    value={this.state.modelo}
                                    name='modelo'
                                />
                                <label htmlFor="floatingModelo">Modelo</label>
                            </div>
                            <br />

                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="matricula"
                                    placeholder="Matricula"
                                    onChange={this.handleChange}
                                    value={this.state.matricula}
                                    name='matricula'
                                />

                                <label htmlFor="matricula">Matricula</label>
                            </div>
                            <br />


                            <div className="form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="ano"
                                    placeholder="ano"
                                    min="0"
                                    max="2030"
                                    data-bind="value:replyNumber"
                                    onChange={this.handleChange}
                                    value={this.state.ano}
                                    name='ano'
                                />
                                <label for="ano">Año</label>
                            </div>
                            <br />
                            
                            <input className='btn btn-primary'
                                type="submit"
                                value="Guardar"
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Vehiculos_Edit




export function Vehiculos_Edit() {
    const p = useParams();
    
    const navigate = useNavigate();
    
    return (
        <>
            <Internal_Vehiculos_Edit navigate={navigate} params={p}/>
        </>
    );
}
// params={p}


// export function Vehiculo_Edit(props){
    
//     // para poder pasar un parametro por la url, por ejemplo en el boton editar de una tabla uso el useParams();
//     const params = useParams();
    
//     //para poder navear automaticamente al listado una vez que se envio el formulario puedo utilizar useNavigate();
//     const navigate = useNavigate();
//     return <Internal_Vehiculo_Edit navigate={navigate} params={params}/>
// }

// //dentro de la clase lo llamo como this.props.navigate

// .then(
//     ()=>{
//     ...    
//     };
//     this.props.navigate("/vehiculos")
// )

