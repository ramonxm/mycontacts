import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { Loader } from '../../components/Loader';
import toast from '../../utils/toast';

export const EditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      const { name } = await ContactsService.updateContact(id, contact);
      setContactName(name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const loadContact = async () => {
      try {
        const contact = await ContactsService.getContactById(id);
        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
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
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
};
