import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'
import Homelogo from '/src/assets/home.png';
import { Outlet } from 'react-router';
import { Products } from './Products';
import { toast } from 'react-toastify';
import homeVideo from '/src/assets/homevideos.mp4';
import RentalCart from './RentalCart';
import homeimage from '/src/assets/home1.jpg'

export const Home = () => {

  return (
    <>
<Image src={homeimage} height={500} width='100%'></Image>
 <br/>
    <Products></Products>
   
    
 </>
    
  )
}
export default Home;