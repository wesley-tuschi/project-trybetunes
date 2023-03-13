import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
    isLoading: false,
  };

  handleInputChange = ({ target }) => {
    const CRCT = 2;
    const name = target.value;
    const isButtonDisabled = name.length <= CRCT;
    this.setState({ name, isButtonDisabled });
  };

  handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false });

    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { name, isButtonDisabled, isLoading } = this.state;
    const loadingMessage = 'Carregando...';

    return (
      <div data-testid="page-login">
        { isLoading && <div>{ loadingMessage }</div> }
        { !isLoading && (
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
                onClick={ this.handleLoginSubmit }
              >
                Entrar
              </button>
            </label>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Login);
