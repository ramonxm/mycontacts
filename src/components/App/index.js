import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Routes from '../../Routes';
import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';
import { Header } from '../Header';
import { ToastContainer } from '../Toast/ToastContainer';
import { Container } from './style';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
