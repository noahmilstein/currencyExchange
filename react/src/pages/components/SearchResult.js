import React from 'react';

class SearchResult extends React.Component {

  render() {
    return (
      <li className='resultItem' id={this.props.id} onClick={this.props.clickHandler} name={this.props.name} value={this.props.abbreviated}>
        <span className="searchResult">{this.props.expanded}, {this.props.abbreviated}</span>
      </li>
    )
  }
}

export default SearchResult;
