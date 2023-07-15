import PropTypes from 'prop-types';
import css from './ContactList.module.css';

function ContactList({ contacts, onClick }) {
  return (
    <ul className={css.List}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.Item}>
          <p className={css.Contact}>
            {contact.name}: {contact.number}
          </p>
          <button
            className={css.Button}
            type="button"
            id={contact.id}
            onClick={onClick}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactList;
