import { useState, useImperativeHandle, useEffect } from 'react';
import { useErrors } from '../../hooks/useErrors';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';
import CategoriesService from '../../services/CategoriesService';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';

export const useContactForm = (onSubmit, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
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
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(controller.signal);
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

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

  return {
    handleEmailChange,
    handleNameChange,
    handlePhoneChange,
    handleSubmit,
    isFormValid,
    getErrorMessageByFieldName,
    name,
    categories,
    categoryId,
    email,
    phone,
    setCategoryId,
    isSubmitting,
    isLoadingCategories,
  };
};
