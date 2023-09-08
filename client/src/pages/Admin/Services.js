import React, {useState, useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import  toast  from 'react-hot-toast';
import { Link } from "react-router-dom";
const Services = () => {
    const [services, setService] = useState([]);
    //getall services
    const getAllServices = async () => {
        try {
            const { data } = await axios.get('/api/v1/service/get-service');
            setService(data.services);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    //lifecycle
    useEffect(() => {
        getAllServices();
    }, []);
  return (

    <Layout>
    <div>
        <div className="row dashboard">
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Services List</h1>
                <div className='d-flex flex-wrap'>
                
                {services?.map(s   => (
                   <Link key={s._id} to={`/dashboard/admin/service/${s.slug}`}>

                    <div className ="card m-2" style={{width: "18rem"}} >
                      <img src={`/api/v1/service/service-photo/${s._id}`} className ="card-img-top" alt={s.name} />
                      <div className="card-body">
                    <h5 className="card-title">{s.name}</h5>
                    <p className="card-text">{s.description}</p>
       
                 </div>
               </div>
               </Link>
                ))}
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Services;