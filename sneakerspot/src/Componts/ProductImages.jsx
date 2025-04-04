import React, { Fragment } from 'react'

export const ProductImages = ({images}) => {
  return (
    <>
    <img src={images[0]} className='img-fluid mb-3'/>

    {images.map((img,index)=><Fragment key={index}>

<img src={img} height={100} width={100} className='me-2'/>

    </Fragment>)}
    </>
  )
}

