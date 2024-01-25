import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthModel from '../model/AuthModel.js'
import dotenv from 'dotenv'

dotenv.config();
const secretKey = process.env.secretKey;

/*Login User*/
export const LoginUser = async (req,res) =>{
    try {
        const {email,Password} = req.body;
    
        const user = await AuthModel.findOne({ email: email });
        console.log(user);
    
        if (user == null) {
          return res.status(400).json({ message: "User not found.." });
        }
        if(user?.Password == "GoogleSignIn"){
          return res.status(400).json({ message: "You have directly Logged in with google" });
        }
    
        const matchParrsword = await bcrypt.compare(Password, user.Password);//Compare the Password
        if (!matchParrsword) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({  userId: user._id}, 'your_secret_key', { expiresIn: '1h' });// Generating Token
        
        res.status(200).json({token:token ,message:"Login successfull .."});
      } catch (error) {
        console.log(error);
      }
}

/*Register User*/
export const RegisterUser = async (req, res) => {
    try {
      const { email, Password } = req.body;
      console.log(email);
      // const ph = Phone;
  
      const user = await AuthModel.findOne({ email: email });
      console.log(user);
  
      if (user !== null) {
        return res.status(400).json({ message: "Already Registered" });
      }
  
      const saltRounds = 10;
      // Generate a salt
      const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              console.error("Error generating salt:", err);
              reject(err);
            }
    
            bcrypt.hash(Password, salt, (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
                reject(err);
              }
              resolve(hash);
            });
          });
        });
  
      const result = await AuthModel.create({
        email: email,
        Password: hashedPassword,//Hash of Password Created
      });
  
      console.log(result);
  
      res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
      res.status(200).json({ message: "Something went wrong ! Try again" });
      console.log(error);
    }
  };