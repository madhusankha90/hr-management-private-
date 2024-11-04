const User = require('../models/userModel');
const TokenBlacklist = require('../models/tokenBlackListModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req,res) => {
    const {userRole,userName,status,employeeId,password} = req.body;
    try {
      if(!userRole || !userName || !status || !employeeId || !password) {
        return res.status(400).json({message: "All fields are required"})
      }

      if(!password || password.trim() === "") {
        return res.status(400).json({ message : "Password cannot be empty"})
      }
        
      const extingUser = await User.findOne({ employeeId});
        if (extingUser){
            return res.status(409).json({message:"User already exists"})
        }

      const hash = bcrypt.hashSync(password, 10);
      const users = new User({userRole,userName,status,employeeId,password: hash});
      await users.save();

      res.status(201).json({message:"User created successfully" });
  
    } catch (error) {
      res.status(400).json({error: "User save error"})
    }
  }

const loginUser = async (req,res) => {
  const {userName,password} = req.body;
  try {
    const user = await User.findOne({userName});
    if (!user) {
      return res.status(404).json({message:"user not found"})
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message:"invalid password"});
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
    res.status(500).json({error:"login error"})
  }
}

const logOutUser = async (req,res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];

    const expiration = new Date(jwt.decode(token).exp * 1000);
    await TokenBlacklist.create({ token, expiration });
    res.status(200).json({ message: "user logged out successfully." })

  } catch (error) {
    res.status(500).json({ error : "Logout failed." });
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
    res.status(500).json({error: "Internal server error"})
  }
}


module.exports = {createUser ,loginUser, logOutUser, getUser};