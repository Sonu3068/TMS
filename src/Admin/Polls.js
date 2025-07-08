import React from 'react'

export default function Polls(props) {
  return (
    <div className="mai "><main
       
        style={{
          marginLeft: props.isExpanded
            ? window.innerWidth < 768
              ? "3rem"
              : "11.5rem"
            : window.innerWidth > 768
            ? "3rem"
            : "3rem",
        }}
      >
     <h1>This is Polls page</h1> 
     </main>
    </div>
  )
}
