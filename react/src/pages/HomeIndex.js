import React from 'react';
import CurrencyList from './components/Currency';

class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestExchange: [],
      base: '',
      timestamp: ''
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
  }

  componentDidMount() {
    this.getAPI()
  }

  getAPI() {
    $.ajax({
      url: '/api/sources',
      type: 'GET',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ latestExchange: data.rates, base: data.base, timestamp: data.queryTime });
    });
  }

  render() {
    console.log(this.state.latestExchange)
    return (
      <div>
        This is the home index page
        <div>
          <CurrencyList
            data={this.state.latestExchange}
          />
        </div>
      </div>
    );
  }
};

export default HomeIndex;
