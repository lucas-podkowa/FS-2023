import React, { Component } from 'react'

export class Contador extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 90
        }
    }

    handleClickSumar = () => {
        this.setState({ count: this.state.count + 1 });
    }
    handleClickRestar = () => {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return (
            <>
                <button onClick={this.handleClickSumar}>Sumar</button>
                <button onClick={this.handleClickRestar}>Restar</button>
                <h1>{this.state.count}</h1>
            </>
        )
    }
}

export default Contador