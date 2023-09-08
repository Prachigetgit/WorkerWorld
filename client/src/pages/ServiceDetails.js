import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import {useParams} from 'react-router-dom';
const ServiceDetails = () => {
    const params = useParams();
    const [service, setService] = useState({})
    const [relatedServices, setRelatedServices] = useState([])
    //initials details 
    useEffect(() => {
        if(params?.slug) getService()
    }, [params?.slug])
    
    //getService
    const getService = async () => {
        try {
            const {data} = await axios.get(`/api/v1/service/get-service/${params.slug}`);
            setService(data?.service);
            getSimilarservice(data?.service._id, data?.service.category._id);
        } catch (error) {
           console.group(error); 

        }
    } 

    //get similar services
    const getSimilarservice = async (sid,cid) => {
        try {
            const {data} = await axios.get(`/api/v1/service/related-service/${sid}/${cid}`);
            setRelatedServices(data?.services);
        } catch (error) {
           console.log(error)   
        }
    }
  return (
    <div>
    <Layout>
    <div  className='row container mt-4'>
        <div className='col-md-6'>
            <img src={`/api/v1/service/service-photo/${service._id}`}
            className='card-img-top'
            alt={service.name}
              />
        </div>
        <div className='col-md-6'>
            <h4 className=' text-center'>Service Details</h4>
            <h6>Name : {service.name}</h6>
            <h6>Description : {service.description}</h6>
            <h6>Prices starting from  : {service.price}</h6>
            <h6>category : {service.category?.name}</h6>
            <h6>Working days : {service.day}</h6>
            <button  class="btn btn-secondary ms-1">Add to cart</button>
        </div>
    </div>
    <hr />
    <div className='row'>
        <h6>
          similar service  
        </h6>
        {relatedServices.length < 1 && <p className='text-center'>No Similar service Found</p> }
        <div className='d-flex flex-wrap'>
       {relatedServices?.map((s)   => (
<div className= "card m-2"  style={{width: "18rem"}} >
     <img src={`/api/v1/service/service-photo/${s._id}`} 
     className ="card-img-top"
      alt={s.name} />
     <div className="card-body">
      <h5 className="card-title">{s.name}</h5>
     <p className="card-text">{s.description.substring(0, 30)}...</p>
     <p className="card-text"> $ {s.price}</p>
     <button  class="btn btn-secondary ms-1">Add to cart</button>
     </div>
      
    </div>
     ))}
 </div>
 </div>
    </Layout>
        
    </div>
  )
}

export default ServiceDetails