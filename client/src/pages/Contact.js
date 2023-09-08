import React from 'react'
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi"; 
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
    <div className='row contactus'>
      <div className='col-md-6'>
        <img  className='contact-img' src="/contactus.png"  alt="contactus" ></img>
      </div>
      <div className='col-md-4'>
        <h1 className='bg-dark text-white text-center'>CONTACT US</h1>
        <p className='text-justify mt-2'>
          Any Query and info  about our services feel free to call anytime we are 24x7 available at your doorsteps.
        </p>
        <p className="mt-3">
         <BiMailSend /> www.help@wokersWorld.com
        </p>
        <p className='mt-3'>
         <BiPhoneCall /> 012-3456789

        </p>
        <p className='mt-3'>
         <BiSupport /> 1800-0000-0000 (Toll free)
        </p>
     
      </div>
    </div>
        
    </Layout>
    
  );
};

export default Contact;
