import React from 'react';
import Currency from './Currency';

const CurrencyList = (props) => {
  let currencies = props.data.map(currency => {
    return (
      <Currency
        key={currency.id}
        id={currency.id}
        name={currency.currency}
        value={currency.value}
      />
    )
  })

  return(
    <div>
      Currencies go here
      <ul>
        {currencies}
      </ul>
    </div>
  )
}

export default CurrencyList;
