import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtistCard from './ArtistCard';

class ArtistSearch extends Component {
  render() {
    const { artistAlbum, artistMusic } = this.props;
    return artistAlbum.length === 0 ? (<h1>Nenhum álbum foi encontrado</h1>) : (
      <>
        <h1>{ `Resultado de álbuns de: ${artistMusic}` }</h1>
        {
          artistAlbum.map((song) => (
            <ArtistCard
              key={ song.collectionId }
              image={ song.artworkUrl100 }
              albumName={ song.collectionName }
              artistName={ song.artistName }
              collectionId={ song.collectionId }
            />
          ))
        }
      </>
    );
  }
}

ArtistSearch.propTypes = {
  artistAlbum: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  artistMusic: PropTypes.string.isRequired,
};

export default ArtistSearch;
