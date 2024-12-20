import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PunchIn from './components/admin/dashComponets/PunchIn';
import AdminLayout from './AdminLayout';
import MyInfo from './components/PersonalDetails';
import UserLayout from './UserLayout';
import UserManagement from './components/admin/UserManagement';
import AddUser from './components/admin/AddUser';
import { AuthProvider } from './components/context/authContext';
import ContactDetails from './components/ContactDetails';
import EmergencyDetails from './components/EmergencyDetails';
import JobDetails from './components/JobDetails';
import Salary from './components/Salary';
import Report from './components/Report';
import PersonalDetails from './components/PersonalDetails';
import Apply from './components/leave/Apply';
import MyLeave from './components/leave/MyLeave';
import Entitlement from './components/leave/Entitlement';
import Location from './components/location/Location';
import Time from './components/time/Time';
import Performance from './components/performance/Performance';
import Dashboard from './components/dashboard/Dashboard';
import Directory from './components/directory/Directory';
import AllUsers from './components/admin/AllUsers';
import Qualification from './components/myInfo/qualification/Qualification';
import WorkExperience from './components/myInfo/qualification/WorkExperience';

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
            <Route path='/admin/user-management/search' element={<UserManagement/>}/>
            <Route path='/admin/user-management/adduser' element={<AddUser/>} />
            <Route path='/admin/user-management/all-users/' element={<AllUsers/>} />

            <Route path='/admin/my-info/personal/:userName/:_id/' element={<PersonalDetails/>} />
            <Route path='/admin/my-info/contact/' element={<ContactDetails/>} />
            <Route path='/admin/my-info/emergency/' element={<EmergencyDetails/>} />
            <Route path='/admin/my-info/job/' element={<JobDetails/>} />
            <Route path='/admin/my-info/salary/' element={<Salary/>} />
            <Route path='/admin/my-info/qualification/' element={<Qualification />} />
            <Route path='/admin/my-info/report/' element={<Report/>} />

            <Route path='/admin/leave/apply/' element={<Apply/>} />
            <Route path='/admin/leave/my-leave/' element={<MyLeave/>} />
            <Route path='/admin/leave/entitlement/' element={<Entitlement/>} />

            <Route path='/admin/location/' element={<Location/>} />
            <Route path='/admin/time/' element={<Time/>} />
            <Route path='/admin/performance/' element={<Performance/>} />
            <Route path='/admin/dashboard/' element={<Dashboard/>} />
            <Route path='/admin/directory/' element={<Directory/>} />

            <Route path='/admin/my-info/qualification/work-experience/' element={<WorkExperience />} />

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
