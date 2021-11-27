import ReactDOM from 'react-dom';
import { Overlay } from './style';

export const Loader = () => ReactDOM.createPortal(
  <Overlay>
    <div className="loader" />
  </Overlay>,
  document.getElementById('loader-root'),
);
