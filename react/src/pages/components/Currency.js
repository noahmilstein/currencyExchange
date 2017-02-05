import React from 'react';

class Currency extends React.Component {

  render() {
    return (
      <tr className='currencyItem' onClick={this.props.clickHandler} id={this.props.id} value={this.props.abbreviated}>
        <td>{this.props.expanded}</td>
        <td>{this.props.abbreviated}</td>
        <td>{this.props.rate}</td>
      </tr>
    )
  }
}

export default Currency;
