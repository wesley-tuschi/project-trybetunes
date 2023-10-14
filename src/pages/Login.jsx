import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createUser } from '../services/userAPI';
import Logo from '../images/trybetunes-logo.png';
import '../styles/Login.css';

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
      <div className="login-page vh-100" data-testid="page-login">
        {isLoading && <div>{loadingMessage}</div>}
        {!isLoading && (
          <>
            <div className="login-logo">
              <motion.img
                className="img-fluid"
                src={ Logo }
                alt="Logo TrybeTunes"
                initial={ { rotate: 0 } }
                animate={ { rotate: 360 } }
                transition={ {
                  duration: 1,
                  loop: Infinity,
                  ease: 'linear',
                } }
              />
            </div>
            <form className="login-form">
              <label>
                <input
                  placeholder="Digite o seu Nome"
                  data-testid="login-name-input"
                  type="text"
                  value={ name }
                  onChange={ this.handleInputChange }
                />
              </label>
              <button
                className=" btn-login"
                data-testid="login-submit-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleLoginSubmit }
                type="submit"
              >
                Entrar
              </button>
            </form>
          </>
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
