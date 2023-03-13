import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;
    const loadingMessage = 'Carregando...';
    return (
      <header data-testid="header-component">
        { isLoading && <div>{ loadingMessage }</div> }
        { !isLoading && (
          <>
            <span data-testid="header-user-name">
              Name
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
