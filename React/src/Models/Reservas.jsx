import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';


export class Reservas extends Component {
    render() {
        return (
            <div>
                <div className="alert alert-primary" role="alert">
                    este es mi mensaje con un alert de boots
                </div>

                <Alert variant="primary">
                    este es mi mensaje con un alert de boots
                </Alert>
            </div>
        )
    }
}

export default Reservas