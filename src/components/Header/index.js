import { ContainerHeader, InputSearchContainer } from './style';

export const Header = () => (
  <ContainerHeader>
    <img src="/assets/svg/logo.svg" alt="MyContacts" />
    <InputSearchContainer>
      <input type="text" placeholder="Pesquisar pelo nome..." />
    </InputSearchContainer>
  </ContainerHeader>
);
