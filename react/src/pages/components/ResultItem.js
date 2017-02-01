import React from 'react';

const ResultItem = (props) => {
  return (
    <li className='resultItem' id={props.id} onClick={props.handleClick} name={props.expansion} value={props.abbreviation}>
      <span className="searchResult">{props.expansion}, {props.abbreviation}</span>
    </li>
  )
}

export default ResultItem;
