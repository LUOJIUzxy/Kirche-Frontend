// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Routes from './Routes';
// import Page from './components/Page';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'aos/dist/aos.css';

// const App = (): JSX.Element => {
//   return (
//     <Page>
//       <BrowserRouter>
//         <Routes />
//       </BrowserRouter>
//     </Page>
//   );
// };

// export default App;

import React from 'react';
import {useRoutes} from 'react-router-dom';
import {Provider} from 'react-redux';
import Page from './components/Page';

import {CacheProvider} from '@emotion/react';

import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import createTheme from './theme';
import Routes from './Routes';
import useTheme from './hooks/useTheme';
import {store} from './redux/store';
import createCache from '@emotion/cache';
import {AuthProvider} from './contexts/JWTContext';
// import 'chart.js/auto';
import {ReactNotifications} from 'react-notifications-component';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const clientSideEmotionCache = createCache({key: 'css'});

import PropTypes from 'prop-types';

function App({emotionCache = clientSideEmotionCache}) {
  const content = useRoutes(Routes);
  const {theme} = useTheme();
  const persistor = persistStore(store);

  return (
    <Page>
      <CacheProvider value={emotionCache}>
        <ReactNotifications/>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>{content}</AuthProvider>
          </PersistGate>
        </Provider>
      </CacheProvider>
    </Page>
  );
}

App.propTypes = {
  emotionCache: PropTypes.object
};

export default App;
