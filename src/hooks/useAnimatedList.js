import { useCallback, useState } from 'react';

export const useAnimatedList = (initialValue = []) => {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemId, setPendingRemovalItemId] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemId((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemId((prevState) => prevState.filter((itemId) => itemId !== id));
  }, []);

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    pendingRemovalItemId,
  };
};
