 import { comparePassword,
   hashPassword } from "../helpers/authHelper.js";
 import userModel from "../models/usermodel.js";
 import orderModel from "../models/OrderModel.js";
 import JWT from "jsonwebtoken";



export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update profile controller
export const updateProfileController = async (req,res) => {
  try {
    const {name,email,password,address,phone} = req.body
    const user = await userModel.findById(req.user._id)
    //password 
      if(password && password.length < 6){
        return res.json({error:'Password is required and 6 character long'})

      }
      const hashedPassword = password ? await hashPassword(password) : undefined 
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address
      },
      {new:true})
      res.status(200).send({
        success:true,
        message: 'Profile updated successfully',
        updatedUser,

      }) 
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      message:"Error while Update profile",
      error
    })
  }
}

//bookings
export const getBookingsController = async (req,res) => {
  try {
      const bookings = await orderModel
      .find({buyer:req.user._id})
      .populate("services", "-photo")
      .populate("buyer","name")
      res.json(bookings)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error while getting bookings',
      error
    })
  }

}
// get all bookings
export const getAllBookingsController = async (req,res) => {
  try {
      const bookings = await orderModel
      .find({})
      .populate("services", "-photo")
      .populate("buyer","name")
      .sort({createdAt: "-1"});
      res.json(bookings)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error while getting booking',
      error
    })
  }
}


//booking status

export  const bookingStatusController = async (req,res) =>{
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const bookings =  await orderModel.findByIdAndUpdate(bookingId, {status}, {new:true})
    res.json(bookings);    
  } catch (error) {
     console.log(error)
     res.status(500).send({
      success:false,
      message: 'Error while updating booking status',
      error,
     })
  }
}



//test controller
// 
export const testController = (req,res) => {
     res.send("protected route");
};