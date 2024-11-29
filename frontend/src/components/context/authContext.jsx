import { getLocalStorageItem } from "../../utils/storageUtils";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [employeeId, setEmployeeId] = useState(getLocalStorageItem('employeeId') || null);
    const [userName, setUserName] = useState(getLocalStorageItem('userName') || null);
    const [_id, setId] = useState(getLocalStorageItem('_id') || null);
    const [token, setToken] = useState(getLocalStorageItem('token') || null);
    const [role, setRole] = useState(getLocalStorageItem('role') || null);
    const [personalId, setPersonalId] = useState(getLocalStorageItem('personal_Id') || null);
  
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
        setPersonalId(loginData.personalId);
      }
    
        localStorage.setItem("employeeId", loginData.employeeId);
        localStorage.setItem("userName", loginData.userName);
        localStorage.setItem("_id", loginData._id);
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("role", loginData.role);

        if (pId) {
          localStorage.setItem("personal_Id", loginData.personalId);
        }
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