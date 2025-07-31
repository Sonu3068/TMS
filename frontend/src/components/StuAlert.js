import React from 'react'


export default function StuAlert(props) {
  return (
    props.alert&&<div className={`alert alert-${props.alert.result} alert-dismissible fade show`}
 role="alert" style={{height:"auto",width:"100%",textAlign:"center",position:"fixed",zIndex:"1",top:"50px"}}>
  <strong>{props.alert.mssg}</strong> 
  
</div>
  )
}