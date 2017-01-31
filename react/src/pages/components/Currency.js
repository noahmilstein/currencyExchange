import React from 'react';

const Currency = (props) => {
  return (
    <li className='currency' id={props.id}>
      Name: {props.name}, Value: {props.value}
    </li>
  )
}

export default Currency;
