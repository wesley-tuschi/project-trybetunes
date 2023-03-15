import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArtistCard extends Component {
  render() {
    const { artistName, albumName, image, collectionId } = this.props;
    return (
      <div>
        <img
          src={ image }
          alt={ albumName }
        />
        <h2>{artistName}</h2>
        <h3>{albumName}</h3>
        <Link
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
