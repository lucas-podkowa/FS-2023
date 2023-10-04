import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class InternalLogin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nickname: '',
            clave: ''
        }
    }


    // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
    // eso lo diferenciamos mediante "this.props.params.vehiculo_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch
    handleSubmit = (event) => {
        event.preventDefault()

        let usuario = {
            nickname: this.state.nickname,
            clave: this.state.clave
        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        fetch("http://localhost:8080/security/login", parametros)
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
                        sessionStorage.setItem('token', result.body.token)

                        toast.success("bienvenido", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        this.props.navigate("/")
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
                (error) => {
                    toast.error(error.message, {
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
            );


    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>Iniciar Sesión</h1>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>

                        <form onSubmit={this.handleSubmit}>


                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nickname"
                                    onChange={this.handleChange}
                                    value={this.state.nickname}
                                    name='nickname'
                                />
                                <label htmlFor="nickname">Usuario</label>
                            </div>
                            <br />

                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="clave"
                                    onChange={this.handleChange}
                                    value={this.state.clave}
                                    name='clave'
                                />

                                <label htmlFor="clave">Contraseña</label>
                            </div>
                            <br />

                            <input className='btn btn-primary'
                                type="submit"
                                value="Ingresar"
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login



export function Login() {
    const p = useParams();

    const navigate = useNavigate();

    return (
        <>
            <InternalLogin navigate={navigate} params={p} />
        </>
    );
}

