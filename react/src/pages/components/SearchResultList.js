import React from 'react';
import SearchResult from './SearchResult';

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let results = this.props.data.map(result => {
      return (
        <SearchResult
          key={result.id}
          id={result.id}
          abbreviated={result.abbreviated}
          expanded={result.expanded}
          clickHandler={this.props.clickHandler}
          name={this.props.name}
        />
      )
    })

    return(
      <div>
        <ul>
          {results}
        </ul>
      </div>
    )
  }
}

export default SearchResultList;
