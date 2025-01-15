import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }

  body {
    font-family: inherit;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: inherit;
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: -0.02em;
    font-weight: 700;
  }

  p {
    font-family: inherit;
    font-weight: 400;
  }

  button, input, textarea {
    font-family: inherit;
  }

  a {
    font-family: inherit;
  }
`; 