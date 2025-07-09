import React from 'react'
import "./Profile.css"


export default function Profile(props) {
  

  return (
    
    <div className="ma ">
      <main
        
        style={{
          marginLeft:window.innerWidth < 768
              ? "2.5rem"
              : "11.5rem"
          
        }}
      >   <div className="profile-area ">
      <div className="avatar">
        
          <span>👤</span>
        
      </div>
      
    </div>
    <div className="profile-details ">
        <p><strong>Name:</strong> <span className="masked-text">***************</span></p>
        <p><strong>Institute Email:</strong> <span className="masked-text">*********@iiti.ac.in</span></p>
        <p><strong>Department:</strong> <span className="masked-text">***************</span></p>
        <p><strong>Academic Year:</strong> <span className="masked-text">20xx-20xx</span></p>
      </div></main>
      
    </div>
  )
}
