import PropTypes from 'prop-types';
import { Overlay } from './style';
import { Spinner } from '../Spinner';
import { ReactPortal } from '../ReactPortal';
import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount';

export const Loader = ({ isLoading }) => {
  const { animatedElementRef, shouldRender } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
