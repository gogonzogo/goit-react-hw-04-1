import { ImageGalleryItem } from '../image-gallery-item/ImageGalleryItem';
import { Modal } from 'components/modal/Modal';
import PropTypes from "prop-types";

export const ImageGallery = ({ state, handleGalleryClick }) => {
  const { searchFail, images, modalOpen, modalImg, modalImgAlt } = state;
  if (searchFail) {
    return <h1 className="noImagesText">No images found with your search</h1>;
  } else {
    return (
      <ul className="ImageGallery" onClick={e => handleGalleryClick(e)}>
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
        <Modal openModal={modalOpen} image={modalImg} imgTag={modalImgAlt} />
      </ul>
    );
  }
};

ImageGallery.propTypes = {
  state: PropTypes.shape({
    searchFail: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    modalImg: PropTypes.string.isRequired,
    modalImgAlt: PropTypes.string.isRequired,
  }).isRequired,
  handleGalleryClick: PropTypes.func.isRequired,
};