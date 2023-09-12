import React, { Component } from 'react'

export class ComponenteClass extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apellido: 'Podkowa',
            nombre: 'Lucas'
        }
    }

    render() {
        return (
            <div>
                <h1>nombre contiene: {this.state.nombre}</h1>
                <h1>apellido contiene: {this.state.apellido}</h1>
            </div>
        )
    }
}

export default ComponenteClass