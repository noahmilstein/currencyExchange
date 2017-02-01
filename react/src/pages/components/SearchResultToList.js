import React from 'react';
import ResultItem from './ResultItem';

const SearchResultToList = (props) => {
  let results = props.data.map(result => {
    return (
      <ResultItem
        key={result.id}
        id={result.id}
        abbreviation={result.abbreviated}
        expansion={result.expanded}
        handleClick={props.toChange}
      />
    )
  })

  return(
    <div>
      <ul style={{display:'none'}}>
        {results}
      </ul>
    </div>
  )
}

export default SearchResultToList;
