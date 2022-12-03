import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { useNewContact } from './useNewContact';

export function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();

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
}
