import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={e => onSubmit(e)}>
        <button type="submit" className="SearchForm-button">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            style={{ color: '#000000' }}
          />
        </button>
        <input
          className="SearchForm-input"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}