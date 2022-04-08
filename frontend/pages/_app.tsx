import type { AppProps } from 'next/app';
import { AppWrapper } from '@/context/state';
import { ThemeProvider } from '@mui/material';

import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ThemeProvider>
    </>
  )
}

export default MyApp;