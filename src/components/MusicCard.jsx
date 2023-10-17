import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { isFavorite } = this.props;
    this.state = {
      isLoading: false,
      isChecked: isFavorite,
    };
  }

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
      <div className="music-card" data-testid="music-card">
        <div className="track-name" data-testid="track-name">
          {trackName}
        </div>
        <audio
          className="track-audio"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <input
            className="favorite-checkbox"
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleFavorite }
            checked={ isChecked }
          />
          <label className="check-label" htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
          </label>
        </div>
        {isLoading && <div className="loading">Carregando...</div>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
