import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './style';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import isEmailValid from '../../utils/isEmailValid';

export const ContactForm = ({ buttonLabel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);

    if (!e.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'name',
      ));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'Email inválido.' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  };

  const getErrorMessageByFieldName = (fieldName) => (
    errors.find((error) => error.field === fieldName)?.message
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="instagram">
            Instagram
          </option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button tye="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
