import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isButtonDisabled: true,
    };
  }

  handleInputChange = (event) => {
    const CRCT = 2;
    const name = event.target.value;
    const isButtonDisabled = name.length <= CRCT;
    this.setState({ name, isButtonDisabled });
  };

  render() {
    const { name, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label>
            <input
              data-testid="login-name-input"
              type="text"
              value={ name }
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
