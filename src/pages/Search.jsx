import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    bandName: '',
    isButtonDisabled: true,
  };

  handleInputChange = ({ target }) => {
    const CRCT = 1;
    const bandName = target.value;
    const isButtonDisabled = bandName.length <= CRCT;
    this.setState({ bandName, isButtonDisabled });
  };

  render() {
    const { bandName, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label>
            <input
              data-testid="search-artist-input"
              name="bandSearch"
              type="text"
              value={ bandName }
              placeholder="Pesquise o nome da banda"
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
            >
              Procurar

            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
