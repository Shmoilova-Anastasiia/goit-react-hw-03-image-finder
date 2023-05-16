import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery.styled';
import { GalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGalleryList = ({ images, onClick }) => {
  return (
    <ImageGallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <GalleryItem 
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={onClick}
        />
      ))}
    </ImageGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};