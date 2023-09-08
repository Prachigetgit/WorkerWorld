import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/ServiceDetailStyles.css";

const CategoriesServices = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
      if (params?.slug) getServicesByCat();   

    },[params?.slug]);

  const getServicesByCat = async () => {
    try {
        const { data } = await axios.get(
          `/api/v1/service/service-category/${params.slug}`);
        setServices(data?.services);
        setCategory(data?.category);
    } catch (error) {
        console.log(error);
    }
  };
    return (
    <Layout>
        <div className='container mt-3'>
       
         <h4 className='text-center'>Category - {category?.name}</h4>
         <h6 className='text-center'> {services?.length} results found</h6>
         <div className='row'>
         <div className='d-flex flex-wrap'>
             {services?.map((s)   => (
             <div className= "card m-2"  style={{width: "18rem"}} >
                  <img src={`/api/v1/service/service-photo/${s._id}`} 
                  className ="card-img-top"
                   alt={s.name} />
                  <div className="card-body">
                   <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">{s.description.substring(0, 30)}...</p>
                  <p className="card-text"> $ {s.price}</p>
                  <button  class="btn btn-primary ms-1"
                   onClick={() => navigate(`/service/${s.slug}`)}>More Details</button>
                  <button  class="btn btn-secondary ms-1">Add to cart</button>
               </div>
              </div>
             ))}
            </div>
         </div>
        </div>
    </Layout>
  );
};

export default CategoriesServices;