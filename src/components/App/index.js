import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/global';

import { Container } from './style';
import { Header } from '../Header';
import { ContactsList } from '../ContactList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Container>
          <Header />
          <ContactsList />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
