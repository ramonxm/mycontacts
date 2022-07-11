import PropTypes from 'prop-types';
import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import { Spinner } from '../Spinner';
import { ButtonContainer, Form } from './style';

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = name && errors.length === 0;

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category_id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

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

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          {!isSubmitting && buttonLabel}
          {isSubmitting && <Spinner size={16} />}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
