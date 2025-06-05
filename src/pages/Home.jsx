import React from 'react'
import Carousel from '../componets/Carousel'
import ProductCard from '../context/ProductCard'

const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <ProductCard/>
   </div>
   </>
  )
}

export default Home