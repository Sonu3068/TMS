import React from 'react'


export default function Alert(props) {
  return (
    props.alert&&<div class="alert alert-warning alert-dismissible fade show" role="alert" style={{height:"auto",width:"100%",textAlign:"center",top:"0",position:"fixed",zIndex:"100"}}>
  <strong>{props.alert}</strong> 
  
</div>
  )
}
