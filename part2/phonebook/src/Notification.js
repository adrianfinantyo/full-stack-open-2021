import React from 'react'
import './Notification.css';

const Notification = ({ status, tempName }) => {
  if(status === ""){
    return null
  }
  else if(status === 'added'){
    return (<div className="added" >Added { tempName }</div>)
  }
  else if(status === 'update'){
    return (<div className="update" >Information of { tempName } has already been updated to server</div>)
  }
  else if(status === 'delete'){
    return (<div className="deleted" >Information of { tempName } has already been removed from server</div>)
  }
}

export default Notification