import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PunchIn from './components/admin/dashComponets/PunchIn';
import Dashboard from './components/Dashboard';
import Time from './components/Time';
import Location from './components/Location';
import Directory from './components/Directory';
import AdminLayout from './AdminLayout';
import UserInfo from './components/MyInfo'
import MyInfo from './components/MyInfo';
import UserLayout from './UserLayout';
import UserManagement from './components/admin/UserManagement';
import AddUser from './components/admin/AddUser';
import { AuthProvider } from './components/context/authContext';

const App = () => {
  return (
    <div>

      <AuthProvider>
      <BrowserRouter>
        <Routes> 
          
      
        <Route path='/login' element={<Login />} />
          
          <Route path='/' element={<UserLayout/>}> 
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/time' element={<Time/>} /> 
            <Route path='/location' element={<Location/>} />
            <Route path='/directory' element={<Directory/>} />
            
              <Route path='/myinfo' element={<MyInfo/>} />
           
            {/* <Route path='/user-dashboard' element={<PrivateRoute role="user" component={UserDashboard}/>}/> */}
          </Route>

          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/admin-dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/user-management' element={<UserManagement/>}/>
            <Route path='/admin/adduser' element={<AddUser/>} />
            <Route path='/admin/my-info' element={<MyInfo/>} />
            {/* <Route path='/admin-dashboard' element={<PrivateRoute role="admin" component={AdminDashboard}/>}/>
            <Route path='/admin-dashboard/punchin' element={<PrivateRoute role="admin" component={PunchIn}/>}/> */}
          </Route>
        
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
