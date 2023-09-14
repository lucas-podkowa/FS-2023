import React from 'react'
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nombre: 'coconut' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        console.log('actualmente su valor era: ' + this.state.nombre)
        this.setState({ nombre: event.target.value },
            () => {
                console.log('ahora su valor es: ' + this.state.nombre)
            });

    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Pick your favorite flavor:
                    <select value={this.state.nombre} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
export default FlavorForm