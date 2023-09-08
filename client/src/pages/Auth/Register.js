
import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  // form function
  const handleSubmit =  async (e) => {
       e.preventDefault();
           try {
           const res  = await axios.post('/api/v1/auth/register',
             { name, email, password, phone, address, answer });
             if(res && res.data.success){
              toast.success(res.data && res.data.message);
              navigate('/login'); 
            } else{
              toast.error(res.data.message);
             }
         } catch (error) {
         console.log(error);
         toast.error('Something went wrong');
        }
     };

      
  
  return (
    <Layout title= "SignUp - Workers World">
    <div className='spacer'>
       <div className='outer-box'> 
       <div className='inner-box'>
       <header className='signup-header'>
       <h1 className='title' >
        New  to worker's world</h1>
        <p>Signup! It takes 30 seconds</p>
       </header>
       <main className='signup-body'>

       
   <form onSubmit={handleSubmit} >

 
    
  
    <p>
      <label>Fullname:</label>
      <input type="text"
     value={name}
     onChange={(e)=> setName(e.target.value)}
     className="form-control"
      id="exampleInputEmail1" 
      
      required

      />
    </p>
 
   
       
     <p>
      <label>Email:</label>
      <input type="email"
   value={email}
   onChange={(e)=> setEmail(e.target.value)}
    className="form-control"
     id="exampleInputEmail1" 
    
     required
     />
     </p>
     
   
     
   <p>
    <label>Password:</label>
    <input type="password" 
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    className ="form-control"
     id="exampleInputPassword1"
      placeholder='enter a strong password'
     required
     />
   </p>
    
    
 
   <p>
    <label>Phone Number:</label>
    <input type="text"
   value={phone}
    onChange={(e)=> setPhone(e.target.value)}
    className="form-control"
     id="exampleInputEmail1"
    
     required 
     />
     
   </p>
   
    
   <p><label>Address:</label>
   <input type="text"
  value={address}
  onChange={(e)=> setAddress(e.target.value)}
  className="form-control"
  id="exampleInputEmail1" 
  
  />
  
   </p>



 
   <p><label>Enter your favourite sports:</label>
   <input type="text"
  value={answer}
  onChange={(e)=> setAnswer(e.target.value)}
  className="form-control"
  id="exampleInputEmail1" 
  
  />
   </p>



 
    
  
  <button className='primary-button'   >
     Signup</button>
     
  </form>
  </main>
  <div className='signup-footer'>
    <p>Already have an account?
    <Link to={'/login'}>login</Link></p>
  </div>
  </div>

  <div className='circle c1'></div>
  <div className='circle c2'></div>
   </div>
   </div>
 </Layout>
  );
};

export default Register;