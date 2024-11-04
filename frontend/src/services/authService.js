import axios from 'axios';

const login = async (username, password) => {
  try {
    const res = await axios.post('http://localhost:5000/api/admin/login', { userName: username, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.userRole);
  } catch (error) {
    console.error('Login error', error);
  }
};


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export { login, logout };
