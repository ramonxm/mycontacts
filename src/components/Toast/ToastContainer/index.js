import { Container } from './style';

import { ToastMessage } from '../ToastMessage';

export const ToastContainer = () => (
  <Container>
    <ToastMessage text="Default toast" type="success" />
    <ToastMessage text="Default toast" type="danger" />
    <ToastMessage text="Default toast" />
  </Container>
);
