import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="mb-3">
                        <label for="mail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="mail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="pass" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pass" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}

export default Login