import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { useEditContact } from './useEditContact';

export function EditContact() {
  const {
    isLoading,
    contactName,
    handleSubmit,
    contactFormRef,
  } = useEditContact();

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
