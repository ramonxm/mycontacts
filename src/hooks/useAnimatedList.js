import {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

export const useAnimatedList = (initialValue = []) => {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemId, setPendingRemovalItemId] = useState([]);

  const animatedRefs = useRef(new Map());
  const animatedEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemId((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animatedEndListeners.current.get(itemId);
    removeListener();

    animatedEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);
    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemId((prevState) => prevState.filter((id) => itemId !== id));
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemId.includes(item.id);

      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })), [getAnimatedRef, items, pendingRemovalItemId]);

  useEffect(() => {
    pendingRemovalItemId.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animatedEndListeners.current.has(itemId);

      const animatedElement = animatedRef?.current;
      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeListener('animationend', onAnimationEnd);
        };
        animatedElement.addEventListener('animationend', onAnimationEnd);
        animatedEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemId]);

  useEffect(() => {
    const removeListeners = animatedEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  return {
    items,
    setItems,
    renderList,
    handleRemoveItem,
  };
};
