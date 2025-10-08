const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the new user in the mongodb database
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        data: newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Not able to register the user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check the existing user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({
        success: false,
        message: "User Not Registered regiester first ",
      });
    }

      // compare the password from db and entered password
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordMatch) {
        res.status(400).json({
          success: false,
          message: "Incorrect Password Try Again",
        });
      }

      // generate the token for the user
      const token = jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );

      res.status(200).json({
        success: true,
        message: "User Login Successfully",
        token,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports= { registerUser,loginUser };
