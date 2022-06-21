import { useEffect, useState } from 'react';
import { Container } from './style';

import { ToastMessage } from '../ToastMessage';

import { toastManager } from '../../../utils/toast';

export const ToastContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages((prevState) => [...prevState, { type, text, id: Math.random() }]);
    };
    toastManager.on('addtoast', handleAddToast);
    return () => toastManager.removeListener('addtoast', handleAddToast);
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} text={message.text} type={message.type} />
      ))}
    </Container>
  );
};
