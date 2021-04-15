import React, { useState, useEffect } from 'react'

const Notification = ({ status, name }) => {
  const style ={

  }
  if(status === ""){
    return null
  }
  else if(status === 'added'){
    return (
    <div>Added {name}</div>)
  }
  else if(status === 'update'){
    return null
  }
  else if(status === 'delete'){
    return null
  }
}

export default Notification