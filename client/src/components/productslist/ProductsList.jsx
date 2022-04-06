import React from 'react'

import Card from './../card/Card';
import './ProductsList.scss'
const ProductsList =({products}) => {
    console.log(products)
    const listProducts =    products.map(product => (
        
    <Card product={product} key={product.id}/>
    
    ))
    
      return (
        <div>
            
            <div className='main-content'>
                <h3>PRODUCTS</h3>
                {listProducts}
                
                   
                   
               </div> 
        </div>
      )
    }

export default ProductsList