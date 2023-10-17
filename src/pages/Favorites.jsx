import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import '../styles/Favorites.css';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: true,
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;

    let content;

    if (loading) {
      content = <div>Carregando...</div>;
    } else if (favoriteSongs.length === 0) {
      content = <div>Você não tem músicas favoritas.</div>;
    } else {
      content = (
        <div className="content">
          <h1>Suas Músicas Favoritas</h1>
          {favoriteSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              isFavorite
            />
          ))}
        </div>
      );
    }

    return (
      <div>
        <Header />
        {content}
      </div>
    );
  }
}

export default Favorites;
