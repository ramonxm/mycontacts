import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { Container } from './style';
import { Header } from '../Header';
import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';
import Routes from '../../Routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
