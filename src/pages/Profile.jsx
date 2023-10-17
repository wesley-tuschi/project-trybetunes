import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css'; // Importar um arquivo CSS dedicado para estilizar essa página.

class Profile extends Component {
  state = {
    name: '',
    email: 'exemplo@email.com',
    isEditingEmail: false,
  };

  componentDidMount() {
    this.takeGetUser();
  }

  handleEmailToggle = () => {
    this.setState((prevState) => ({
      isEditingEmail: !prevState.isEditingEmail,
    }));
  };

  takeGetUser = async () => {
    const getUserName = await getUser();
    this.setState({
      name: getUserName.name,
    });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleEmailSubmit = (event) => {
    event.preventDefault();
    this.setState({ isEditingEmail: false });
  };

  render() {
    const { name, email, isEditingEmail } = this.state;
    return (
      <>
        <Header />
        <div className="page-profile" data-testid="page-profile">
          <h1>Perfil</h1>
          <section className="profile-info">
            <h2>Informações Pessoais</h2>
            <div className="info-item">
              <span className="info-label">Nome de Usuário:</span>
              <span className="info-value">{name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{email}</span>
            </div>
          </section>
          <section className="profile-actions">
            <h2>Ações</h2>
            <button className="profile-button" onClick={ this.handleEmailToggle }>
              {isEditingEmail ? 'Cancelar' : 'Alterar Email'}
            </button>
            {isEditingEmail && (
              <form onSubmit={ this.handleEmailSubmit }>
                <label>
                  Novo Email:
                  <input
                    type="email"
                    value={ email }
                    onChange={ this.handleEmailChange }
                  />
                </label>
                <button type="submit">Salvar</button>
              </form>
            )}
          </section>
        </div>
      </>
    );
  }
}

export default Profile;
