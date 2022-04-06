import React from 'react'
import './Card.scss'

const Card = ({product}) => {
  return (
    <div>
        <div key={product.id} className='card'>
        
        <div className='card-img'>
        
        <img src={product.imageUrl} alt={product.title}/>
        
        </div>
       
        <div className='card-header'>
            <h2>{product.title}</h2>
            <p>{product.desc}</p>

            <p className='price'>${product.price}</p>
            </div>
          
    </div>
    </div>
  )
}

export default Card