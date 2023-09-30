import React, { Component } from 'react'
import Formulario_X from './Ejemplos/Formulario_X';
import FlavorForm from './Ejemplos/FlavorForm';

/*
state representan los valores renderizados, es decir, lo que hay actualmente en la pantalla. 
Las llamadas a setState son asíncronas; 
no te fíes de que "this.state" refleje el nuevo valor inmediatamente después de llamar a setState .
*/
export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contador: 100
        }
        //this.incremetar = this.incremetar.bind(this);
    }

    handleClick = () => {
        this.setState({ contador: this.state.contador + 1 });
    }

    render() {
        const numbers = [1, 2, 3, 4, 5];
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>{number}</li>
        );
        return (
            <>
                <p>Contador en: {this.state.contador} </p>
                <button
                    onClick={this.handleClick}
                    className="btn btn-outline-primary">Incrementar</button>
                {/* <ul >{listItems}</ul> */}

                <Formulario_X />
                <hr />
                <FlavorForm />
            </>
        )
    }
}

export default Home