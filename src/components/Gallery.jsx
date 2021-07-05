import React from 'react';
import PropTypes from 'prop-types';

class Gallery extends React.Component {
  render() {
    const { dogs, name } = this.props;
    return (
      <>
        {
          dogs.map((dog, index) => {
            const type = dog.split('/')[4];
            return (
              <div key={ index } className="gallery-container">
                <h3>{ name[index] }</h3>
                <img src={ dog } alt="Foto de um cachorro" className="dog-image" />
                <h4>{ type }</h4>
              </div>
            );
          })
        }
      </>
    );
  }
}

Gallery.propTypes = {
  dogs: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;
