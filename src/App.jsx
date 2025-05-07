
import './App.css';
import { useEffect } from 'react';
import SignPage from './Pages/SignPage';
import { ConfigProvider } from 'antd';
import { Routes, Route } from "react-router-dom";
import { load, useData } from "./Utils/zustand"
import Loading from './Components/Loading';
import Profile from "./Pages/Profile"
import Private_routes from './Routes/PrivateRoutes';
import '@ant-design/v5-patch-for-react-19';
import NotFound from './Pages/404';

function App() {
  const { loadStatus, SetLoading, RemoveLoading } = load();
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
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        }

      </ConfigProvider>
    </>
  )
}

export default App
