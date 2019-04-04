import React from 'react';

export default ({input, label}) => {
  return(
    <div>
        <label>{label}</label>
        <textarea {...input}></textarea>
    </div>
  )
}