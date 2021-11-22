import { Overlay, Container, Footer } from './style';
import { Button } from '../Button';

export const Modal = () => (
  <Overlay>
    <Container>
      <h1>
        Título do modal
      </h1>
      <p>
        Corpo do modal
      </p>
      <Footer>
        <button type="button" className="cancel-button">
          Cancelar
        </button>
        <Button type="button">
          Deletar
        </Button>
      </Footer>
    </Container>
  </Overlay>
);
