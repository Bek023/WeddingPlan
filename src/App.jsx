
import './App.css';
import { useEffect } from 'react';
import SignPage from './Pages/SignPage';
import { ConfigProvider } from 'antd';
import { Routes, Route } from "react-router-dom";
import { load, useData } from "./Utils/zustand"
import Loading from './Components/Loading';
import Profile from "./Pages/Profile"
import Private_routes from './Routes/PrivateRoutes';

function App() {
  const { loadStatus, SetLoading, RemoveLoading } = load();
  const { data, getData } = useData();

  useEffect(() => {
    RemoveLoading();
  }, []);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FB62F6",
            colorInfo: "pink",
          },
        }}>
        {loadStatus ? <Loading /> :
          <Routes>
            <Route path='/sign' element={<SignPage />} />
            <Route path='/' element={
              <Private_routes>
                <Profile />
              </Private_routes>} />
          </Routes>
        }

      </ConfigProvider>
    </>
  )
}

export default App
