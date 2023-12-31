import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Layout from "./../components/Layout/Layout";
import useCategory from '../hooks/useCategory';

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={"All Categories"}>
     <div className='container'>
     <div className='row'>
       {categories.map((c) => (
        <div className='col-md-6 mt-5 mb-3 gx-3 gy-3 '>
            <Link  to="/" className='btn btn-secondary'>
            {c.name}</Link>
            
       </div>
       ))}
        
        
        
        
        
     </div>

     </div>
    </Layout>
  )
}

export default Categories