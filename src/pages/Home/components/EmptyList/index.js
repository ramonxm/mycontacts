/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './style';

export const EmptyList = () => (
  <Container>
    <img src="/assets/svg/empty-box.svg" alt="empty-box" />
    <p>
      Você ainda não tem nenhum contato cadastrado!
      Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu
      primeiro!
    </p>
  </Container>
);
