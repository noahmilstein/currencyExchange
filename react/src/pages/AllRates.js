import React from 'react';
import CurrencyList from './components/CurrencyList';

class AllRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      allCurrencies: []
    };
    this.getAPI = this.getAPI.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillMount() {
    this.getAPI()
  }

  getAPI() {
    let data = JSON.stringify({baseCurrency: this.state.baseCurrency })
    $.ajax({
      url: '/api/sources/all_rates',
      type: 'POST',
      data: data,
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        allCurrencies: data.allCurrencies,
        baseCurrency: data.baseCurrency
      });
    });
  }

  clickHandler(e) {
    this.setState({ baseCurrency: e.currentTarget.attributes.value.value }, () => {
      this.getAPI();
    })
  }

  render() {
    const base = this.state.baseCurrency;
    let comparitor;
    if (base !== 'USD') {
      comparitor = `${base.expanded}, ${base.abbreviated}: ${base.rate}`
    }

    return (
      <div id="allRates">
        <div><h6><strong>Base Currency:</strong></h6> {comparitor}</div>
        <div>
          <CurrencyList
            data={this.state.allCurrencies}
            clickHandler={this.clickHandler}
          />
        </div>
      </div>
    );
  }
};

export default AllRates;
