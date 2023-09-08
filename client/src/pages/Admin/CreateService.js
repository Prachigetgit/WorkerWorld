import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import  toast  from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select

const CreateService = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [day,setDay] = useState("")
  const [photo,setPhoto] = useState("")
  const [Serviceloc, setServiceloc] = useState("")
  

  //get all category
  
  const getAllCategory = async () => {
    try {
       const {data} = await axios.get('/api/v1/category/categorys');
       if(data?.success){
          setCategories(data?.category);
       }
    } catch (error) {
       console.log(error)
      toast.error('Something went wrong in getting category');
    }
  };
  useEffect(() => {
     getAllCategory();
  }, []);

//create service function
const handleCreate = async (e) => {
  e.preventDefault()
  try {
    const serviceData = new FormData()
    serviceData.append("name", name);
    serviceData.append("description", description);
    serviceData.append("price", price);
    serviceData.append("day", day);
    serviceData.append("photo", photo);
    serviceData.append("category", category);
    const  { data } = axios.post('/api/v1/service/create-service', serviceData );
    if(data?.success){
      toast.error(data?.message);
    
    } else{

      toast.success("Service Created Successfully");
      navigate('/dashboard/admin/services');
    }
  } catch (error) {
    console.log(error)
    toast.error('something went wrong');
  }

};

  return (
    <Layout title={"Dashboard- Create Service"}>
     <div className='container-fluid m-3 p-3'>
        <div className='row'>
    <div className='col-md-3'>
        <AdminMenu/>
    </div>
    <div className='col-md-9'>
       <h1>Create service</h1>
       <div className='m-1 w-75'>
        <Select border={false} 
        placeholder="Select a category " 
        size="large"
        showSearch 
        className="form-select mb-3" onChange={(value) => {setCategory(value);
        }}>
        {categories?.map(c => (
          <Option key={c._id} value={c._id}> {c.name}</Option>
        ))}

        </Select>
        <div className='mb-3'>
          <label  className='btn btn-outline-secondary col-md-12'>
            {photo ?  photo.name : "Upload photo"}
          <input 
          type="file"
           name="photo"
            accept='image/*'
             onChange={(e) => setPhoto(e.target.files[0])} 
             hidden

           />
           </label>
        </div>
        <div className="mb-3">
          {photo && (
            <div className='text-center'>
            <img 
            src={URL.createObjectURL(photo)} 
             alt="service_photo"
             height={'200px'}
             className='img img-responsive'
              /> 
            </div>
           )}
        
       </div>
       <div className='mb-3'>
        <input type="text" value={name} 
        placeholder='write a name'
        className='form-control'
        onChange={(e) => setName(e.target.value)}

        />
       </div>
       <div className='mb-3'>
         <textarea type="text" value={description} 
         placeholder='write a description'
         className='form-control'
         onChange={(e) => setDescription(e.target.value)}
           />
       </div>
       <div className='mb-3'>
        <input type="text" value={price} 
        placeholder='write a Price'
        className='form-control'
        onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='mb-3'>
       <input type="number" value={day} 
       placeholder='write a working day available'
       className='form-control'
       onChange={(e) => setDay(e.target.value)}
       />
     </div>
     <div className='mb-3'>
      <Select bordered={false}
      placeholder='service available'
      size='large'
      showSearch
      className='form-select mb-3'
      onChange={(value) =>{ setServiceloc(value);
      }}
      >
      <Option value="0">No</Option>
      <Option value="1">Yes</Option>
      </Select>
     </div>
     <div className='mb-3'>
      <button className='btn btn-primary w-20' onClick={handleCreate}>CREATE SERVICE</button>
     </div>
    </div>
   </div>
   </div>
   </div>
    </Layout>
  )
}

export default CreateService;