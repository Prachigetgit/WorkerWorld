import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import welcome from   '../assests/welcome.mp4';
import { Link } from 'react-router-dom';
// import {Player} from "/video-react/dist/video-react.css";
// import '~video-react/dist/video-react.css';

import {Checkbox} from  'antd';
import axios from 'axios';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const Homepage = () => {
   const navigate = useNavigate();
   const [cart,setCart] = useCart();
   const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading, setLoading] = useState(false);



 
//get all cat
  const getAllCategory = async () => {
    try {
       const {data} = await axios.get('/api/v1/category/categorys');
       if(data?.success){
          setCategories(data?.category);
       }
    } catch (error) {
       console.log(error)
      
    }
  };
  useEffect(() => {
     getAllCategory();
  }, []); 
//get all services
const getAllServices = async () => {
  try {
    setLoading(true)
    const {data} = await axios.get(`/api/v1/service/service-list/${page}`);
    setLoading(false)
    setServices(data.services);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};


 // get Total count
 const getTotal = async () => {
  try {
    const {data} = await axios.get('/api/v1/service/service-count');
    setTotal(data?.total);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if(page === 1) return;
  loadMore();
}, [page])
//load more
const loadMore = async  () => {
  try {
    setLoading(true)
    const {data} = await axios.get(`/api/v1/service/service-list/${page}`)
    setLoading(false)
    setServices([...services, ...data?.services])
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  getAllCategory();
  getTotal();
}, []);


// filter by cat
const handleFilter = (value, id) => {
  let all = [...checked]
  if(value){
    all.push(id)
  }else{
    all = all.filter(c => c!==id);
  }
  setChecked(all);
}
useEffect(() => {
  if(!checked.length) getAllServices();
 
},[checked.length]); 

useEffect(() => {
 if(checked.length) filterService()
}, [checked]);
//get filterd services
const filterService = async () => {
  try {
    const {data} = await axios.post('/api/v1/service/service-filters',{checked})
    setServices(data?.services)
  } catch (error) {
    console.log(error);

  }
}

  return (
    <Layout title={'Best offers!!! - Workers World'}>
          <header>

<div className="container header-section flex">
    <div className="heaader-left">
      <h1>Workers at Doorsteps</h1>
       <p>Connecting & Caring. We are providing you essential Workers with comfort and Care.
    </p>
    <Link to="/register" className="primary-button get-started-button">Get Started</Link>
    </div>
    <div className="header-right">
        <img src="/web5.jpg" alt="" />
    </div>
     </div>

     </header>
           
         <div className='container-fluid row mt-3 home-page'>
          <div className='col-md-3 filters '>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column m-5'>
          {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
            </div>
           <div className='d-flex flex-column'>
            <button className='btn btn-danger'
             onClick={() => window.location.reload()}>
              RESET
            </button>
           </div>
          
          </div>

          <div className='col-md-9'>
   
            <h1 className='text-center'>All Services</h1>
            <div className='d-flex flex-wrap'>
            {services?.map((s)   => (
            <div className= "card m-2"  style={{width: "18rem"}} >
                 <img src={`/api/v1/service/service-photo/${s._id}`} 
                 className ="card-img-top"
                  alt={s.name} />
                 <div className="card-body">
                 <div className='card-name-price'>
                  <h5 className="card-title">{s.name}</h5>
                  <h5 className="card-title card-price"> 
                  $ {s.price}</h5>
                  </div>
                 <p className="card-text">{s.description.substring(0, 30)}...</p>
                
                 <div className='card-name-price'>
                 <button  classname="btn btn-info ms-1"
                  onClick={() => navigate(`/service/${s.slug}`)}>More Details</button>
                 <button  classname="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart,s]);
                    localStorage.setItem('cart', JSON.stringify([...cart, s]))
                  toast.success("service added to cart")}}>
                 Add to cart</button>
              </div>
             </div>
             </div>
            ))}
            </div>
            <div className='m-2 p-3'>
              {services && services.length <total && (
                <button className='btn btn-warning'
                onClick={(e) =>{
                  e.preventDefault();
                  setPage(page + 1);
                }}
                >
                  {loading ? "loading...." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
          
         </div>
         {/* additional section  */}
         <section className="big-feature-section">
        
        <div className="container flex big-feature-container">
            <div className="feature-img">
                <img src="/web4.jpg" alt="" />
            </div>
            <div className="feature-desc flex">
                <h4>Effortless & Affordable</h4>
                 <h3>Workers at home</h3>
                 <p>Our organisation believes in providing best work possible to our customers. Within a limited time period.</p>
            </div>
        </div>
     </section>
     <section className="big-feature-section">
        
        <div className="container flex big-feature-container" style={{flexDirection : 'row-reverse'}}>
            <div className="feature-img">
                <img src="./web6.png" alt="" />
            </div>
            <div className="feature-desc flex">
                <h4>Security & Safety</h4>
                 <h3>for our customers</h3>
                 <p>We make sure to keep all the infomation provided by our customers are safe . All the Workers from our orgainsation are trustable and linked with us.</p>
            </div>
        </div>
     </section>
     <section className="big-feature-section">
        
        <div className="container flex big-feature-container">
            <div className="feature-img">
                <img src="../web3.png" alt="" />
            </div>
            <div className="feature-desc flex">
                <h4>Maximizing the Output</h4>
                 <h3>increasing the opportunity</h3>
                 <p> We have all the possible services which are not that easy ton find at your doorsteps in minimal interval of time.</p>
            </div>
        </div>
     </section>
    </Layout>
   
  );
};

export default Homepage;






