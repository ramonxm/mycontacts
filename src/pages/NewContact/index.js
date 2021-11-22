import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export const NewContact = () => (
  <>
    <PageHeader title="Novo contato" />
    <ContactForm
      buttonLabel="Cadastrar"
    />
  </>
);
