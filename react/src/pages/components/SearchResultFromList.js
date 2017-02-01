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
      <ul style={{display:'none'}}>
        {results}
      </ul>
    </div>
  )
}

export default SearchResultFromList;
