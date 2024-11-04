import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId') || null);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
    const [_id, setId] = useState(localStorage.getItem('_id') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    const login = (id, name, userId, userToken, userRole) => {
        const loginData = {
            employeeId: id,
            userName: name,
            _id: userId,
            token: userToken,
            role: userRole,
        };

       
        setEmployeeId(loginData.employeeId);
        setUserName(loginData.userName);
        setId(loginData._id);
        setToken(loginData.token);
        setRole(loginData.role);

        
        Object.keys(loginData).forEach(key => localStorage.setItem(key, loginData[key]));
    };

    const logout = () => {
        setEmployeeId(null);
        setUserName(null);
        setId(null);
        setToken(null);
        setRole(null);

        // Remove items from localStorage
        ['employeeId', 'userName', '_id', 'token', 'role'].forEach(item => localStorage.removeItem(item));
    };

    return (
        <AuthContext.Provider value={{ employeeId, userName, _id, token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
