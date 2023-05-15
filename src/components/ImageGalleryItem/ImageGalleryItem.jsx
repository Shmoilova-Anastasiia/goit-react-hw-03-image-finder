import PropTypes from 'prop-types';

import { ImageGalleryItem, Image } from './ImageGalleryItem.styled';

export const GalleryItem = ({
    webformatURL,
    largeImageURL,
    tags,
    onClick,
}) => (<ImageGalleryItem
    onClick={() => {
        onClick(largeImageURL);
    }}>
    <Image src={webformatURL} alt={tags} />
</ImageGalleryItem>);

GalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};