import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        { isLoading && <div>{ loadingMessage }</div> }
        { !isLoading && (
          <>
            <span data-testid="header-user-name">
              {`E ai ${name} !!`}
            </span>
            <Link to="/search" data-testid="link-to-search">
              Search
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              Profile
            </Link>

          </>
        )}
      </header>
    );
  }
}

export default Header;
