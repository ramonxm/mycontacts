import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './style';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import { useErrors } from '../../hooks/useErrors';

export const ContactForm = ({ buttonLabel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
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
          type="email"
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
