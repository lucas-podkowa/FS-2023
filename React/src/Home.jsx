import React, { Component } from 'react'

export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contador: 0
        }
        //this.incremetar = this.incremetar.bind(this);
    }

    incremetar() {
        //console.log(this)
        this.setState({
            contador: this.state.contador + 1
        },
            () => {
                console.log("estado callback  " + this.state.contador);
            });
        // this.state.contador = this.state.contador + 1;
    }

    render() {

        return (
            <>
                <p>Contador en: {this.state.contador} </p>
                <button onClick={() => this.incremetar()}
                    className="btn btn-outline-primary">Incrementar</button>
            </>
        )
    }
}

export default Home