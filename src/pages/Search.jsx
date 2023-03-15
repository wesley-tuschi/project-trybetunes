import { Component } from 'react';
import ArtistSearch from '../components/ArtistSearch';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistName: '',
    isButtonDisabled: true,
    isLoading: true,
    artistMusic: '',
    artistAlbum: [],
    albumLoading: false,
  };

  handleInputChange = ({ target }) => {
    const CRCT = 1;
    const artistName = target.value;
    const isButtonDisabled = artistName.length <= CRCT;
    this.setState({ artistName, isButtonDisabled });
  };

  searchMusic = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({
      isLoading: false,
      artistName: '',
    });

    const artistAlbum = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: true,
      artistMusic: artistName,
      artistAlbum,
      albumLoading: true,
    });
  };

  render() {
    const {
      artistName,
      isButtonDisabled,
      isLoading,
      artistMusic,
      artistAlbum,
      albumLoading,
    } = this.state;

    const loadingMessage = 'Carregando...';

    return (
      <div data-testid="page-search">
        <Header />
        {!isLoading && <div>{ loadingMessage }</div> }
        {isLoading && (
          <form>
            <label>
              <input
                data-testid="search-artist-input"
                name="bandSearch"
                type="text"
                value={ artistName }
                placeholder="Pesquise o nome da banda"
                onChange={ this.handleInputChange }
              />
              <button
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.searchMusic }
              >
                Pesquisar

              </button>
            </label>
          </form>
        )}
        {albumLoading && (
          <div>
            <ArtistSearch
              artistMusic={ artistMusic }
              artistAlbum={ artistAlbum }
            />
          </div>
        )}
      </div>
    );
  }
}

export default Search;
