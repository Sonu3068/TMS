import React from 'react'
import  './Header.css'

export default function Header() {
  return (
   <>
   <div className='head '> 
   <div className='bell border'><i class="fa-solid fa-bell"></i></div> 
   <div className='user border'><i  class="fa-solid fa-circle-user"></i></div>
   
   <div className='border'>
   
   <div> username</div>
   <div className='student'>student</div>
   </div>
   <select className='opt border'>
    <option value="#" ></option>
    <option className="log" value="log out">log out</option>
   </select>
</div>
  
  
   </>
  )
}
