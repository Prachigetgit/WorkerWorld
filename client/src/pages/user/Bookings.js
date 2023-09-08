import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';



const Bookings = () => {
 const [bookings,setBookings] = useState([])
 const [auth, setAuth] = useAuth();
 
 const getBookings = async() => {
    try {
       const { data } = await axios.get('/api/v1/auth/bookings');
       setBookings(data);
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(() => {
    if(auth?.token) getBookings();
  }, [auth?.token]);
  return (
    <Layout title={"Your Bookings"}>
       <div className="container-fluid p-3 m-3">
       <div className="row">
        <div className="col-md-3">
            <UserMenu/>
        </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All bookings</h1>
               {
                bookings?.map((o, i) => {
                  return(
                    <div className='border'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>status</th>
                          <th scope='col'>Buyer</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Payment</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment?.success ?  "Success" : "Failed"}</td>
                         
                          </tr>
                      </tbody>
                    </table>
                    <div className='container'>
                    {
                      o?.services?.map((s, i) => (
                        <div className='row  mb-2 card flex-row'>
                        <div className='col-md-4'>
                        <img src={`/api/v1/service/service-photo/${s._id}`} 
                         className ="card-img-top"
                          alt={s.name} />
                        </div>
                        <div className='col-md-8'>
                          <p>{s.name}</p>
                          <p>{s.description.substring(0, 30)}</p>
                          <p>Price: {s.price}</p>
                          
                        </div>
                        </div>
                     ))}
                    </div>
                    </div>
                  );
                })
               }
            </div>
       </div> 
       </div>
       
    </Layout>
  )
}

export default Bookings