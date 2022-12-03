import { useEffect } from 'react';
import { Container } from './style';
import { ToastMessage } from '../ToastMessage';
import { toastManager } from '../../../utils/toast';
import { useAnimatedList } from '../../../hooks/useAnimatedList';

export const ToastContainer = () => {
  const {
    setItems,
    renderList,
    handleRemoveItem,
  } = useAnimatedList();

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setItems((prevState) => [
        ...prevState,
        {
          type, text, id: Math.random(), duration,
        },
      ]);
    };
    toastManager.on('addtoast', handleAddToast);
    return () => toastManager.removeListener('addtoast', handleAddToast);
  }, [setItems]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          onRemoveMessage={handleRemoveItem}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
};
