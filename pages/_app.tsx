// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import "@/styles/globals.css";
import 'pure-react-carousel/dist/react-carousel.es.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import Navbar from './components/navbar/navbar';

const theme = createTheme({
  fontFamily: 'Kanit, Open Sans, sans-serif',
  primaryColor: 'red',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <Navbar />
        <Component {...pageProps} />

      </div>
    </MantineProvider>
  );
}