import { Route, Routes, BrowserRouter } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import Header from "./components/Header/Header.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { ToastContainer } from "react-toastify";
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '17c0c072af5049d8a19f9e118afe7f8c9399e1b33f676f8c83fb3850d2c702afefde4efdcbd67e7d14150f5eb8f23389',
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
