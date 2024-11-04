const express = require('express');
const { createUser, loginUser, logOutUser, getUser } = require('../controllers/userController');
const {authenticateToken, isAdmin } = require('../middleware/authMiddleware') 
const router = express.Router();

router.post('/signup', createUser);
// router.post('/login', authenticateToken, isAdmin, loginUser, (req,res)=> {
//   res.json({message: "welcome admin"})
// });

router.post('/login',loginUser);
router.post('/logout', logOutUser);
router.post('/get-users',getUser)
// router.post('/get-users',authenticateToken,isAdmin, getUser)


// router.get('/admin', authenticateToken, (req, res) => {
    
//     if (!req.user || req.user.userRole !== 'Admin') {
//       return res.status(403).json({ message: "Access denied, admin only" });
//     }
  
//     res.status(200).json({ message: "Welcome, admin!" });
//   });
  

module.exports = router;