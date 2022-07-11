import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { Loader } from '../../components/Loader';
import toast from '../../utils/toast';

export const EditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = () => {

  };

  useEffect(() => {
    setIsLoading(true);
    const loadContact = async () => {
      try {
        const contactData = await ContactsService.getContactById(id);
        setContact(contactData);
        setIsLoading(false);
      } catch (error) {
        navigate('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    };
    loadContact();
  }, [id, navigate]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Ramon Xavier" />
      <ContactForm
        key={contact.id}
        contact={contact}
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
};
