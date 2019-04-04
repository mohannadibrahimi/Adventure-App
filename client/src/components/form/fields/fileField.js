import React from 'react';

export default ({input, label}) => {
  return(
    <div>
        <label>{label}</label>
        <input type="file" accept='.jpg, .png, .jpeg' {...input}/> 
    </div>
  )
}