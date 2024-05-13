
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Main from './layout/Main';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Messages from './components/Messages';
import Doctors from './components/Doctors';
import AddNewAdmin from './components/AddNewAdmin';
import AddNewDoctor from './components/AddNewDoctor';
// import Sidebar from './components/Sidebar'; 
import { useContext, useEffect } from 'react';
import { Context } from './main';
import axios from 'axios';
import './App.css'

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setAdmin} = useContext(Context)

  useEffect(()=>{
    const featchUSer = async()=>{
      try {
        const response = await axios.get('https://hospital-management-backend-287f.onrender.com/api/v1/user/admin/me',{
          withCredentials:true
        })
        setIsAuthenticated(true)
        setAdmin(response.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setAdmin({})
      }
    }
    featchUSer()
  },[isAuthenticated])




  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main/>}>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/admin/addnew' element={<AddNewAdmin/>} />
        <Route path='/doctor/addnew' element={<AddNewDoctor/>} />
        {/* <Route path='/sidebar' element={<Sidebar/>} /> */}
          
      </Route>
    )
  );
  return (
    <>
    <RouterProvider router={router}/>
    <ToastContainer/>

   
    </>
  )
}

export default App