import React from 'react'
import './Offers.css'
import exclusive_image from '../exclusive_image.png'

function Offers () {
  return (
   <div className="offers">
   <div className="offers-left">
   <h1>Exclusive</h1>
   <h1>Offers For you</h1>
   <p>Only on best sellers prodct</p>
   <button>Check It Now</button>

   </div>
   <div className="offers-right"><img src={exclusive_image} alt="" />
   </div></div>
  )
}

export default Offers