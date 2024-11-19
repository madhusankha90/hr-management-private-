const User = require('../models/userModel');
const TokenBlacklist = require('../models/tokenBlackListModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req,res) => {
    const {userRole,userName,status,employeeId,password} = req.body;
    try {
      if(!userRole || !userName || !status || !employeeId || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        })
      }

      if(!password || password.trim() === "") {
        return res.status(400).json({ 
          success: false,
          message : "Password Cannot be Empty",
        })
      }
        
      const extingUser = await User.findOne({ employeeId});
        if (extingUser){
            return res.status(409).json({
              success: false,
              message:"User Already Exists"
            })
        }

      const hash = bcrypt.hashSync(password, 10);
      const users = new User({userRole,userName,status,employeeId,password: hash});
      await users.save();

      res.status(201).json({
        success: false,
        message:"User Created Successfully",
       });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "User Saving Error",
        error: error.message,
      })
    }
  }

const loginUser = async (req,res) => {
  const {userName,password} = req.body;
  try {
    const user = await User.findOne({userName});
    if (!user) {
      return res.status(404).json({message:"User Not Found"})
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message:"Invalid Password"});
    }
    const token = jwt.sign(
      { id: user._id, userRole: user.userRole },
       process.env.JWT_SECRET, 
      {expiresIn: '30d'});
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
          id: user._id,
          userRole: user.userRole,
          userName: user.userName,
          employeeId: user.employeeId,
      }
  });

  } catch (error) {
    res.status(500).json({error:"Login Error"})
  }
}

const logOutUser = async (req,res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];

    const expiration = new Date(jwt.decode(token).exp * 1000);
    await TokenBlacklist.create({ token, expiration });
    res.status(200).json({ message: "user logged out successfully." })

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Logout Failed",
      error: error.message ,
    });
  }
}


const getUser = async (req,res) => {
  const { employeeId, userName, userRole, status } = req.body;
  const searchCriteria = {};

  if (employeeId) {
    searchCriteria.employeeId = employeeId;
  }
  if (userName) {
    searchCriteria.userName = userName.toUpperCase();
  }
  if (userRole) {
    searchCriteria.userRole = userRole;
  }
  if (status) {
    searchCriteria.status = status;
  }

  try {
    const user = await User.find(searchCriteria);
    res.json({user});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}


module.exports = {createUser ,loginUser, logOutUser, getUser};