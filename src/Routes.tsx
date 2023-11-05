import React from 'react';
import async from './components/async/Async';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/Main';
import FixedLayout from './layouts/Fixed';
import FluidLayout from './layouts/Fluid';

// Guards
import AuthGuard from './components/guards/AuthGuard';
// Auth pages
import SignIn from './pages/SigninCover';

// Contact Page
const TermsPage = async(() => import('./pages/CompanyTerms'));

const ContactPage = async(() => import('./pages/Contacts'));
const HomePage = async(() => import('./pages/Home'));
const NewsPage = async(() => import('./pages/News'));
//const MeetupPage = async(() => import('./pages/Elearning'));
// const SupportPage = async(() => import('./pages/HelpCenter'));
const AlbumPage = async(() => import('./pages/Album'));

const Routes = [
  {
    path: '/',
    element: (
      <AuthGuard>
      </AuthGuard>
    ),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <SignIn/>,
      }
    ],
  },
  {
    path: 'home',
    // element: <DashboardLayout/>,
    children: [
      {
        path: '',
        element: <HomePage/>,
      },
    ]
  },
  {
    path: 'terms',
    element: <TermsPage/>,
  },
  {
    path: 'news',
    // element: <DashboardLayout/>,
    children: [
      {
        path: '',
        element: <NewsPage/>,
      },
    ],
  },
  {
    path: 'meetups',
    element: <NewsPage/>
  },
  {
    path: 'contacts',
    element: <ContactPage/>,
  },
  {
    path: 'support',
    element: <NewsPage/>,
  },
  {
    path: 'album',
    element: <AlbumPage/>,
    // children: [
    //   {
    //     path: '',
    //     element: <AlbumPage/>,
    //   },
    // ],
  },
  {
    path: '*',
    element: <SignIn/>,
    // children: [
    //   {
    //     path: '*',
    //     element: <SignIn/>,
    //   },
    // ],
  },
];

// const Routes = (): JSX.Element => {
//   return (
//     <ReactRoutes>
//       {viewsRoutes.map((item, i) => (
//         <Route key={i} path={item.path} element={item.renderer()} />
//       ))}
//       {/* {docsRoutes.map((item, i) => (
//         <Route key={i} path={item.path} element={item.renderer()} />
//       ))} */}
//       {blocksRoutes.map((item, i) => (
//         <Route key={i} path={item.path} element={item.renderer()} />
//       ))}
//       {/* {demosRoutes.map((item, i) => (
//         <Route key={i} path={item.path} element={item.renderer()} />
//       ))} */}
//       <Route path="*" element={<Navigate replace to="/not-found-cover" />} />
//     </ReactRoutes>
//   );
// };

export default Routes;
