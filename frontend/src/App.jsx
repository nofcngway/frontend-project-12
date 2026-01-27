import { Route, Routes, BrowserRouter } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import Header from "./components/Header/Header.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { ToastContainer } from "react-toastify";
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '4ad6fba7f61c47969803457a9461bbfcb4c1184692809c5da37668a2ffd2cd2d5a9ba6ef4cf412ba7d153cf8ef0ed1a1',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
