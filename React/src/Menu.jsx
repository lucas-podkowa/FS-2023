
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';



/*
si no tengo token ===>  null
si tnego pero esa vacio ===> ""
tengo y ya tiene algo ===> klsajfd0jsduc23902r

*/


function Menu() {
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        const t = sessionStorage.getItem('token')
        if (t !== token) {
            setToken(t)
        }

        //aca ventra un interval
    });


    function logout() {
        sessionStorage.removeItem('token');
        setToken("");
        // navigate("/");

    }

    // const token = sessionStorage.getItem('token')
    if (token !== "" && token !== null) {
        // var decoded = jwt_decode(token);
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                    <a className=" navbar-brand" href="#">
                        <img className='circular' src="imagen.png" alt="" width="50" height="50" />
                    </a>
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

                                    <button className='btn btn-outline-danger btn-sm' onClick={() => logout()}>
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
                    <div className="container">
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

export default Menu