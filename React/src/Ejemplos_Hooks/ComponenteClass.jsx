import React, { Component, useState } from 'react'

class ComponenteClass extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apellido: 'Podkowa',
            nombre: 'Lucas',
            concatenado: ''
        }
    }

    concatenar = () => {
        this.setState({ concatenado: this.state.nombre + ' ' + this.state.apellido });
    }

    render() {
        return (
            <div>
                <h2>nombre contiene: {this.state.nombre}</h2>
                <h2>apellido contiene: {this.state.apellido}</h2>

                <hr />
                <button onClick={this.concatenar}>Concatenar</button>
                <h3>Concatedado con setState:{this.state.concatenado}</h3>
            </div>
        )
    }
}
export default ComponenteClass



//entendiendo hook -- https://youtu.be/PIPC6kKR6Xw?si=g__4-7Ln1Z4nHLUp
//hooks personalizados -- https://youtu.be/ISGCTngdp8c?si=gPtIC20OiZv8x9Tn
//useEffect() -- https://youtu.be/0_D8ruGVp20?si=7InK1bgSqHzI6q4-
