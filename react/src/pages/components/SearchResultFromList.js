import React from 'react';
import ResultItem from './ResultItem';

const SearchResultFromList = (props) => {
  let results = props.data.map(result => {
    return (
      <ResultItem
        key={result.id}
        id={result.id}
        abbreviation={result.abbreviated}
        expansion={result.expanded}
        handleClick={props.fromChange}
      />
    )
  })

  return(
    <div>
      Results go here
      <input type="text" className="search" placeholder="Country or Currency" onChange={props.handleChange} onKeyUp={props.handleKeyUp} />
      <ul>
        {results}
      </ul>
    </div>
  )
}

export default SearchResultFromList;
