import React from 'react';

const Option = (props) => {
  return (
    <option className='option' value={props.abbreviation}>{props.abbreviation}: {props.expansion}</option>
  )
}

export default Option;
