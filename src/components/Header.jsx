import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    this.takeGetUser();
  }

  takeGetUser = async () => {
    const getUserName = await getUser();
    this.setState({
      name: getUserName.name,
      isLoading: false,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    const loadingMessage = 'Carregando...';
    return (
      <header className="header-component wh-100" data-testid="header-component">
        { isLoading && <div className="loading-message">{ loadingMessage }</div> }
        { !isLoading && (
          <>
            <h1 className="user-name" data-testid="header-user-name">
              {`E ai ${name} !!`}
            </h1>
            <Link to="/search" className="links" data-testid="link-to-search">
              Search
            </Link>
            <Link to="/favorites" className="links" data-testid="link-to-favorites">
              Favorites
            </Link>
            <Link to="/profile" className="links" data-testid="link-to-profile">
              Profile
            </Link>

          </>
        )}
      </header>
    );
  }
}

export default Header;
