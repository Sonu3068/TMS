import React from 'react'

export default function Profprofile() {
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
      </div></main>
      
    </div>
  )
}
