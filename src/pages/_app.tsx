/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';

import Page from '../components/Page';
import { AuthProvider } from '../contexts/JWTContext';
import { ReactNotifications } from 'react-notifications-component';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'react-notifications-component/dist/theme.css';

import type { ReactNode } from 'react';
import type { NextPage } from 'next';
type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps }): JSX.Element {

  // Ensure that `getLayout` is a valid function returning a React element.
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Kirche Chinese</title>
      </Head>
      <Page>
        <ReactNotifications/>
        <AuthProvider>
          {/* Ensure that `getLayout` renders a valid React element */}
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </Page>
    </React.Fragment>
  );
}
