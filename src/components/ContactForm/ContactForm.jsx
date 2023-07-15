import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  schema = Yup.object().shape({
    name: Yup.string()
      .required('Name required')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Invalid name'
      ),
    number: Yup.string()
      .length(9)
      .required('Number required')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d/,
        'Invalid number'
      ),
  });

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values, actions) => {
    this.props.onSubmit(values);

    actions.resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        <Form autoComplete="off" className={css.Form}>
          <label htmlFor="name" className={css.Label}>
            Name
            <Field
              className={css.Input}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <ErrorMessage name="name" />
          </label>
          <label htmlFor="number" className={css.Label}>
            Number
            <Field
              className={css.Input}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <ErrorMessage name="number" />
          </label>
          <button type="submit" className={css.SubmitBtn}>
            Add contact
          </button>
        </Form>
      </Formik>
    );
  }
}

export default ContactForm;
