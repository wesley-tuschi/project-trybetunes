import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ArtistCard.css';

class ArtistCard extends Component {
  render() {
    const { artistName, albumName, image, collectionId } = this.props;
    return (
      <div className="artist-card">
        <img
          className="img-fluid artist-image"
          src={ image }
          alt={ albumName }
        />
        <h2 className="artist-name">{artistName}</h2>
        <h3 className="album-name">{albumName}</h3>
        <Link
          className="link-to-album"
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Album
        </Link>
      </div>

    );
  }
}

ArtistCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default ArtistCard;
