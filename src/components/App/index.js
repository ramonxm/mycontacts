import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/global';

import { Container } from './style';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>Olá, mundo!</Container>
    </ThemeProvider>
  );
}

export default App;
