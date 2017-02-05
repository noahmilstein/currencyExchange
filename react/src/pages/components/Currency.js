import React from 'react';

class Currency extends React.Component {

  render() {
    return (
      <li className='currencyItem' onClick={this.props.clickHandler} id={this.props.id} value={this.props.abbreviated}>
        <span className="currencyItem">{this.props.expanded}, {this.props.abbreviated}: {this.props.rate}</span>
      </li>
    )
  }
}

export default Currency;
