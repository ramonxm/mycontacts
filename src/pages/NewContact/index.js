import { useRef } from 'react';
import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export const NewContact = () => {
  const contactFormRef = useRef(null);

  const handleSubmit = async (contact) => {
    try {
      await ContactsService.createContact(contact);
      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  };

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
};
