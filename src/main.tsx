import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'aos/dist/aos.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './global.css';
import { Provider } from 'react-redux';
import { store } from './Redux/Stores/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);
