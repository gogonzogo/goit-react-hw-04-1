import PropTypes from 'prop-types';

export const Modal = ({ openModal, image, imgTag }) => {
  return (
    openModal && (
      <div className="overlay">
        <div className="modal">
          <img src={image} alt={imgTag} />
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  imgTag: PropTypes.string.isRequired,
}