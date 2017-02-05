import React from 'react';
import Currency from './Currency';

class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let currencies = this.props.data.map(currency => {
      return (
        <Currency
          key={currency.id}
          id={currency.id}
          abbreviated={currency.abbreviated}
          expanded={currency.expanded}
          rate={currency.rate}
          clickHandler={this.props.clickHandler}
        />
      )
    })

    return(
      <div>
        <ul>
          {currencies}
        </ul>
      </div>
    )
  }
}

export default CurrencyList;
