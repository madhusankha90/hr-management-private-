import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId') || null);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
    const [_id, setId] = useState(localStorage.getItem('_id') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);
    const [personalId, setPersonalId] = useState(localStorage.getItem('personal_Id') || null);
  
    const login = (id, name, userId, userToken, userRole, pId = null) => {
      const loginData = {
        employeeId: id,
        userName: name,
        _id: userId,
        token: userToken,
        role: userRole,
        personalId: pId,
      };
  
      setEmployeeId(loginData.employeeId);
      setUserName(loginData.userName);
      setId(loginData._id);
      setToken(loginData.token);
      setRole(loginData.role);
  
      if (pId) {
        setPersonalId(pId);
        localStorage.setItem('personal_Id', pId);
      } else {
        setPersonalId(null);
        localStorage.removeItem('personal_Id');
      }
  
      Object.keys(loginData).forEach(key => {
        if (loginData[key] !== null) {
          localStorage.setItem(key, loginData[key]);
        }
      });
    };
  
    const logout = () => {
      setEmployeeId(null);
      setUserName(null);
      setId(null);
      setToken(null);
      setRole(null);
      ['employeeId', 'userName', '_id', 'token', 'role'].forEach(item => localStorage.removeItem(item));
    };
  
    return (
      <AuthContext.Provider value={{ employeeId, userName, _id, token, role, personalId, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);