import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Welcome,
} from './components';

const Agency = (): JSX.Element => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  const scrollTo = (id: string): void => {
    setTimeout(() => {
      const element: HTMLElement = document.querySelector(`#${id}`);
      if (!element) {
        return;
      }

      window.scrollTo({ left: 0, top: element.offsetTop, behavior: 'smooth' });
    });
  };

  const theme = useTheme();

  const styles = (bgImage: string) =>
    ({
      position: 'absolute',
      objectFit: 'cover',
      /* support for plugin https://github.com/bfred-it/object-fit-images */
      fontFamily: 'object-fit: cover;',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${bgImage})`,
      filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
    } as const);

  return (
    <Main>
      <Box
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
        bgcolor={'alternate.main'}
        marginTop={-13}
        paddingTop={13}
      >
        <Container>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Welcome />

          </Box>
        </Container>
      </Box>

    </Main>
  );
};

export default Agency;
