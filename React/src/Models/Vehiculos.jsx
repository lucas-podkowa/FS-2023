import React, { Component } from 'react'
import Contador from '../Ejemplos_Hooks/Contador'
import { Contador_Hook } from '../Ejemplos_Hooks/Contador_Hook'
import ComponenteClass from '../Ejemplos_Hooks/ComponenteClass'
import { ComponenteHook } from '../Ejemplos_Hooks/ComponenteHook'

export class Vehiculos extends Component {
    render() {
        return (
            <div>
                <Contador />
                <hr />
                <br />
                <Contador_Hook />
                <hr />
                <br />
                <ComponenteClass />
                <br />
                <hr />
                <ComponenteHook />
            </div>
        )
    }
}

export default Vehiculos