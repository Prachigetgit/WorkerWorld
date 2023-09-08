import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgetPassword from './pages/Auth/ForgetPassword';
import AdminRoute from './components/Routes/AdminRoute';
import Admindashboard from './pages/Admin/Admindashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateService from './pages/Admin/CreateService';
import Users from './pages/Admin/Users';
import Bookings from './pages/user/Bookings';
import Profile from './pages/user/Profile';
import Services from './pages/Admin/Services';
import UpdateService from './pages/Admin/UpdateService';
import Search from './pages/Search';
import ServiceDetails from './pages/ServiceDetails';
import Categories from './pages/Categories';
import CategoriesServices from './pages/CategoriesServices';
import CartPage from './pages/CartPage';
import AdminOrder from './pages/Admin/AdminOrder';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/service/:slug' element={<ServiceDetails/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/category/:slug' element={<CategoriesServices/>} />
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>} />
      <Route path="user/bookings" element={<Bookings/>} />
      <Route path="user/profile" element={<Profile/>} />
      </Route>
      <Route path="/dashboard" element= {<AdminRoute />}>
        <Route path="admin" element={<Admindashboard/>} ></Route>
       <Route path="admin/create-category" element={<CreateCategory />} ></Route>
       <Route path="admin/create-service" element={<CreateService />} ></Route>
       <Route path="admin/service/:slug" element={<UpdateService />} ></Route>
       <Route path="admin/services" element={<Services />} ></Route>
       <Route path="admin/users" element={<Users />} ></Route>
       <Route path="admin/bookings" element={<AdminOrder />} ></Route>
      </Route>
      
      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgetPassword/>} />
      <Route path='login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy />} />
      <Route path='*' element={<Pagenotfound />} />
     </Routes>
     
     
      
    </>
  );
}

export default App;
