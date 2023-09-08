import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth' 
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  
  //state
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");


//get user data
useEffect(() => {
  const {email, name, phone,address} = auth.user 
  setName(name)
  setPhone(phone)
  setAddress(address)
  setEmail(email)

},[auth.user])


// form function
const handleSubmit =  async (e) => {
  e.preventDefault();
      try {
      const {data}  = await axios.put('/api/v1/auth/profile',
        { name,
          email,
          password,
          phone,
          address 
        });
        if(data?.error){
          toast.error(data?.error);

        }else{
           setAuth({...auth, user:data?.updatedUser})
           let ls = localStorage.getItem("auth")
           ls = JSON.parse(ls)
           ls.user = data.updatedUser
           localStorage.setItem('auth', JSON.stringify(ls));
           toast.success('profile updated successfully');
          }  
        }
     catch (error) {
    console.log(error);
    toast.error('Something went wrong');
   }
  };
  return (
    <Layout title={"Your Profile"}>
        <div className="container-fluid p-3 m-3">
          <div className="row">
          <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className='col-md-9'>
            
     <div className='outer-box1'>
      <div className='inner-box'>
        <header className='signup-header'>
        <h1 className='title' >User Profile</h1>
        </header>
        <main className='signup-body'>
        <form onSubmit={handleSubmit} >

 
 
  
<p><label>Your name</label> 
<input type="text"
 value={name}
 onChange={(e)=> setName(e.target.value)}
 className="form-control"
  id="exampleInputEmail1" 
  
  />
 </p>  

<p> <label>Your Email</label>
<input type="email"
value={email}
onChange={(e)=> setEmail(e.target.value)}
className="form-control"
 id="exampleInputEmail1" 
 
 disabled
 /></p>
 

 
<p> <label>enter a strong password</label>

<input type="password" 
value={password}
onChange={(e)=> setPassword(e.target.value)}
className ="form-control"
 id="exampleInputPassword1"
  
 
 />
 </p>

<p> <label>Your phone number</label>
<input type="text"
value={phone}
onChange={(e)=> setPhone(e.target.value)}
className="form-control"
 id="exampleInputEmail1"

  
 /></p>




<p><label>Your address</label>
<input type="text"
value={address}
onChange={(e)=> setAddress(e.target.value)}
className="form-control"
id="exampleInputEmail1" 

/></p>






<button  className='primary-button' >
 UPDATE</button>
 
</form>
 
        </main>
      </div>
    
     </div>

       </div>
   
  </div>  
            </div>
      
       
       
       
       
       
       
       
       
       
       
       
       

    </Layout>
  )
}

export default Profile