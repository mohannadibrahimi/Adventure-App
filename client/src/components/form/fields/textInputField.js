import React from 'react';

export default ({input, label, placeholder}) => {
  return(
    <div>
        <label>{label}</label>
        <input type="text" {...input}/> 
    </div>
  )
}