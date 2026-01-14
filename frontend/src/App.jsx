import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LoginPage from "./pages/Login/LoginPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
