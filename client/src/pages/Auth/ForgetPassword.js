import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Workers World"}>
          <div className="outer-box1">
          <div className="inner-box">
            <header className="signup-header">
            <h1 > RESET PASSWORD</h1>
            </header>
               <main className="signup-body">
               <form onSubmit={handleSubmit} >
              
        <p>
          <label>
            Email
          </label>
          <input type="email"
       value={email}
       onChange={(e)=> setEmail(e.target.value)}
       className="form-control"
        id="exampleInputEmail1" 
        
        required
        />
        </p>

       
       
          <p>
          <label>
          Enter Your  favorite Sport Name
          </label>
          <input type="text"
            value={answer}
            onChange={(e)=> setAnswer(e.target.value)}
            className="form-control"
              required
              /></p>
           
        
          
          <p><label>new password</label>
          <input type="password" 
     value={newPassword}
    onChange={(e)=> setNewPassword(e.target.value)}
    className ="form-control"
     id="exampleInputPassword1"
      
     required
    />
     </p>
    
    
       
      <button className='primary-button'>RESET </button>
     
      </form>
     
        </main>
   
      </div>
      <div class="circle c1 "></div>
        <div class="circle c2 "></div>
          </div>
      
    </Layout>
  )
}

export default ForgotPassword;























