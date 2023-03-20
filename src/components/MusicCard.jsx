import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  handleFavorite = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked } = this.state;
    this.setState({ isLoading: true });

    const song = {
      trackName,
      previewUrl,
      trackId,
    };

    if (isChecked) {
      await removeSong(song);
    } else {
      await addSong(song);
    }
    this.setState({ isLoading: false, isChecked: !isChecked });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;

    return (
      <div data-testid="music-card">
        <div data-testid="track-name">{trackName}</div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleFavorite }
            checked={ isChecked }
          />
          <label htmlFor={ `checkbox-music-${trackId}` }>Favorita</label>
        </div>
        {isLoading && <div>Carregando...</div>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
