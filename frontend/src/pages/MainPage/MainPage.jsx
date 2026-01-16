import { Navigate } from 'react-router-dom';

const MainPage = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      main page
    </div>
  )
};

export default MainPage;
