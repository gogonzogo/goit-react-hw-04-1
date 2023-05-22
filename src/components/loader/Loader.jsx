import { MagnifyingGlass } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({ loading }) => {
  return loading && (
      <div className="loaderContainer">
        <MagnifyingGlass
          visible={true}
          height="100"
          width="100"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="white"
          color="black"
        />
      </div>
    )
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
}