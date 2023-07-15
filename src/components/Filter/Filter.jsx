import PropTypes from 'prop-types';
import css from './Filter.module.css'

function Filter({ filter, onChange }) {
  return (
    <div className={css.Container}>
      <h3 className={css.Subtitle}>Find contacts by name</h3>
      <input type="text" placeholder="John Legend" value={filter} onChange={onChange} />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;