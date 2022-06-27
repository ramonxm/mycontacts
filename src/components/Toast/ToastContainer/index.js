import { useCallback, useEffect, useState } from 'react';
import { Container } from './style';

import { ToastMessage } from '../ToastMessage';

import { toastManager } from '../../../utils/toast';

export const ToastContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages((prevState) => [
        ...prevState,
        {
          type, text, id: Math.random(), duration,
        },
      ]);
    };
    toastManager.on('addtoast', handleAddToast);
    return () => toastManager.removeListener('addtoast', handleAddToast);
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
};
