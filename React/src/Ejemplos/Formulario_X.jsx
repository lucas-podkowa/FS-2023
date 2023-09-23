import React from 'react'
class Formulario_X extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        console.log('actualmente su valor era: ' + this.state.name)
        this.setState({ name: event.target.value },
            () => {
                console.log('ahora su valor es: ' + this.state.name)
            });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <hr />
                <h1>{this.state.name}</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>Ingrese su nombre:
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Enviar" />
                </form>
            </>
        );
    }
}
export default Formulario_X
