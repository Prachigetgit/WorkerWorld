import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Login = () => {
   

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
 
  const navigate = useNavigate();
   const location = useLocation();
  // form function
  const handleSubmit =  async (e) => {
  e.preventDefault();
      try {
      const res  = await axios.post('/api/v1/auth/login',
        {  email, password });
        if(res && res.data.success){
         toast.success(res.data && res.data.message);
         setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
         });
         localStorage.setItem('auth', JSON.stringify(res.data));
         navigate( location.state ||'/'); 
       } else{
         toast.error(res.data.message);
        }
    } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
   }
  };
  return (
    

 <Layout>

   <div className='outer-box1'>
    <div className='inner-box'>

   <header className='signup-header'>
   <h1 className="title">Welcome Back</h1>
   </header>
    <main className='signup-body'>
    <form onSubmit={handleSubmit} >
    
    
  
    <p>
      <label>Your Email</label>
      <input className='login-input' type="email"
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
    
     id="exampleInputEmail1" 
     
     required
     />
    </p>

     
       <p>
        <label>Enter your password</label>
        <input type="password" 
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    className ="login-input"
     id="exampleInputPassword1"
      
     required
     />
       </p>
    
   
       <button className='primary-button'>Login </button>
   
    </form>
   
     
    </main>
    <div className='signup-footer'>
    
    <Link className='link-forget' to='/forgot-password' onClick={() => {navigate('/forgot-password')}}>Forget Password</Link>
    
   </div>  
 
   </div>
   <div class="circle c1 "></div>
    <div class="circle c2 "></div>
   </div>
           
</Layout>
 );
};
export default Login;