import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { Component } from 'react';
import css from './ContactForm.module.css';

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

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
            <div
              className={css.Item}
              data-title="Name may contain only letters and spaces. For example Adrian, Jacob Mercer."
            >
              <Field
                className={css.Input}
                id="name"
                type="text"
                name="name"
                placeholder="Jacob Mercer"
              />
            </div>
            <FormError name="name" />
          </label>
          <label htmlFor="number" className={css.Label}>
            Number
            <div
              className={css.Item}
              data-title="Phone number must be 7 digits and contain dashes. For example: 787-78-78"
            >
              <Field
                className={css.Input}
                id="number"
                type="tel"
                name="number"
                placeholder="787-78-78"
              />
            </div>
            <FormError name="number" />
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
