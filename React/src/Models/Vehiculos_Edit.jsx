import React, { Component } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
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

    componentDidMount() { 

        if (this.props.params.vehiculo_id) {
            let parametros = {
                method: 'GET',
               
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            
            fetch("http://localhost:8080/vehiculo/:"+ this.props.params.vehiculo_id , parametros)
                .then(res => {
                    
                    res.json().then(
                            body => (
                                {
                                    status: res.status,
                                    ok: res.ok,
                                    headers: res.headers,
                                    body: body
                                }
                            )
                        ).then(
                            result => {
                                if (result.ok) {
    
                                    console.log(result)
                                    // this.setState({
                                    //     marca_id: result.bodythis.state.marca_id,
                                    //     matricula: this.state.matricula,
                                    //     modelo: this.state.modelo,
                                    // })
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
                            });
                       })
                .catch((error) => {
                    console.log(error)
                });
        }
        
        
                    //    this.props.navigate("/vehiculos/grid")

     }

    handleSubmit = (event) => {
        event.preventDefault()
        //alert('enviando datos al backend del modelo: ' + this.state.modelo + this.state.matricula);

        let vehiculo = {
            marca_id: this.state.marca_id,
            matricula: this.state.matricula,
            modelo: this.state.modelo,
        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(vehiculo),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
        fetch("http://localhost:8080/vehiculo/", parametros)
            .then(res => {
                
                res.json().then(
                        body => (
                            {
                                status: res.status,
                                ok: res.ok,
                                headers: res.headers,
                                body: body
                            }
                        )
                    ).then(
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
                        });
                   })
            .catch((error) => {
                console.log(error)
            });
                       this.props.navigate("/vehiculos/grid")
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        // const navigate = useNavigate();
        return (
            
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.params.vehiculo_id ? `Edicion del Vehiculo ${this.props.params.vehiculo_id}` : "Alta de Vehiculo"}</h1>
                    </div>
                </div>


                <div className='row'>
                    <div className='col'>

{/* <h1>{this.props.params.vehiculo_id}</h1> */}

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
                                    id="floatingMatricula"
                                    placeholder="Matricula"
                                    onChange={this.handleChange}
                                    value={this.state.matricula}
                                    name='matricula'
                                />

                                <label htmlFor="floatingMatricula">Matricula</label>
                            </div>
                            <br />
                            <input className='btn btn-primary'
                                type="submit"
                                value="Finalizar"
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

