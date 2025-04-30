import { useData } from './Utils/zustand';
import './App.css';
import { useEffect } from 'react';
import SignPage from './Pages/SignPage';

function App() {

  // const {data, getData} = useData();


  // useEffect(() => {
  //   getData();
  //   console.log(data);
  // }, []);
  // useEffect(() => {
  //   // getData();
  //   console.log(data);
  // }, [data]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <>
      <SignPage/>
    </>
  )
}

export default App
