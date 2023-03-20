import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    songs: [],
    favoriteSongs: [],
    loadingFavorites: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const albumId = match.params.id;
    const results = await getMusics(albumId);
    const songs = results.slice(1);
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      artistName: results[0].artistName,
      albumName: results[0].collectionName,
      songs,
      favoriteSongs,
      loadingFavorites: false,
    });
  }

  render() {
    const { artistName, albumName, songs, favoriteSongs, loadingFavorites } = this.state;

    if (loadingFavorites) {
      return <div>Carregando...</div>;
    }

    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">{artistName}</div>
        <div data-testid="album-name">{albumName}</div>
        <div data-testid="song-list">
          {songs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              isFavorite={
                favoriteSongs.some((favSong) => favSong.trackId === song.trackId)
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
