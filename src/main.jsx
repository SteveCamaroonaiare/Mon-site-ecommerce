import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './home/Home.jsx' ;
import HomeShop from './homeshop/HomeShop.jsx' ;
{/**import ProductPage from './productpage/ProductPage.jsx' ;
 */}

import AddProduct from './addProduct/AddProduct.jsx' ;

import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/banner/Banner.jsx';
import ErrorPage from './components/errorpage/ErrorPage.jsx';

import Services from './components/services/Services.jsx';
import Login from './login/Login.jsx';
import Panier from './panier/Panier.jsx';
import MyAccount from './myaccount/MyAccount.jsx';


import ShowProduct from "./showproduct/ShowProduct.jsx"; // <-- depuis src directement

import ForgotPassword from './components/forgotpassword/ForgotPassword';
import Register from './login/Register';
import GoogleLogin from './login/GoogleLogin';
import CartNotification from './showproduct/CartNotification';
import ProductImages from './showproduct/ProductImages.jsx';
import SizeSelector from './showproduct/SizeSelector.jsx';
import ColorSelector from './showproduct/ColorSelector.jsx';
import Guide1  from './components/guide/Guide1.jsx';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    
    children:[
      {path:"/" , element:<Home/>},
      {path:"/HomeShop" , element:<HomeShop/>},
      {path:"/Login" , element:<Login/>},
      {path:"/GoogleLogin" , element:<GoogleLogin/>},

       {path:"/ForgotPassword" ,element:<ForgotPassword />},
       {path:"/Register" ,element:<Register />},


      {path:"/ShowProduct/:id" , element:<ShowProduct/>},
      {path:"CartNotification" , element:<CartNotification/>},
      {path:"ProductImages" , element:<ProductImages/>},
      {path:"ColorSelector" , element:<ColorSelector/>},
      {path:"SizeSelector" , element:<SizeSelector/>},



      {path:"/Panier" , element:<Panier/>},
      {path:"/MyAccount" , element:<MyAccount/>},
      
      {path:"/Addproduct" , element:<AddProduct/>},
      {path:"/Guide1" , element:<Guide1/>},

      


      

{/**      {path:"/product/:id" , element:<ProductPage/>},
 */},





      {path:"/shop" , element:<Banner/>},
      {path:"/" , element:<Services/>},
      


      
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} /> 
  
)
