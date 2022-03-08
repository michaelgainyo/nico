import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import { Layout } from './Layout';
import { Loading } from '@miq/componentjs';
import { AppProvider } from './appStore';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <AppProvider>
          <Layout />
        </AppProvider>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
