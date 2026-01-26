import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './locales/i18n.js';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx'
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      {/* нужен ли этот провайдер, если при инициализации i18n он сам привязывается к реакту? надо будет покумекать */}
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  </Provider>
)
