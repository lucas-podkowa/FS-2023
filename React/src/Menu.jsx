import React, { Component } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";


export class Menu extends Component {

    // constructor(props) {
    //     super(props)

    //     this.logout = this.logout.bind(this);
    // }

    logout = () => {
        sessionStorage.removeItem('token');
        console.log("sesión cerrada")
    }
    render() {
        const token = sessionStorage.getItem('token')
        if (token) {
            var decoded = jwt_decode(token);
            return (
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link to="/" className='nav-link'> Inicio</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/vehiculos" className='nav-link'> Vehiculos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/reservas" className='nav-link'> Reservas</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/hook" className='nav-link'> hook</Link>
                                    </li>
                                    <li className="nav-item">

                                        <button className='btn btn-danger' onClick={this.logout}>
                                            <span className="material-symbols-outlined">
                                                logout
                                            </span>
                                        </button>

                                        {/* <Link to="/login" className='nav-link'> Login</Link> */}


                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
            )
        } else {
            return (
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link to="/" className='nav-link'> Inicio</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">

                                    <li className="nav-item">
                                        <Link to="/login" className='nav-link'> Login</Link>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
            )
        }


    }
}

export default Menu