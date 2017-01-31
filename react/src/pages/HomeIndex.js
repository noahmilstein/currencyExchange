import React from 'react';
import CurrencyList from './components/CurrencyList';
import SelectFromList from './components/SelectFromList';
import SelectToList from './components/SelectToList';

class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestExchange: [],
      base: '',
      timestamp: '',
      currencyCodes: [],
      compareFrom: '',
      compareTo: '',
      inputValue: 1,
      outputValue: '',
      firstQueryTranspired: false
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

// make more states to account for finalInput && finalOutput
// values determined in componentDidMount by multiplying or dividing
// values in fields are set to those states

  componentDidMount() {
    this.getAPI()
    if (this.state.firstQueryTranspired) {
      this.getLatestExchange()
    }
  }

  getAPI() {
    $.ajax({
      url: '/api/sources',
      type: 'GET',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ currencyCodes: data.currencyCodes });
    });
  }

  handleFromChange(event) {
    this.setState({compareFrom: event.target.value}, () => {
      this.getLatestExchange();
    })
  }
  handleToChange(event) {
    if (this.state.firstQueryTranspired === false) {
      this.setState({firstQueryTranspired: true});
    }
    this.setState({compareTo: event.target.value}, () => {
      this.getLatestExchange();
    })
  }
  handleInputChange(event) {
    this.setState({inputValue: event.target.value}, () => {
      this.getLatestExchange();
    })
  }
  handleOutputChange(event) {
    this.setState({outputValue: event.target.value}, () => {
      this.getLatestExchange();
    })
  }

  getLatestExchange() {
    if (this.state.compareFrom !== '' && this.state.compareTo !== '') {
      let data = JSON.stringify({compareFrom: this.state.compareFrom, compareTo: this.state.compareTo })
      $.ajax({
        url: '/api/sources/latest_exchange',
        type: 'POST',
        data: data,
        contentType: 'application/json'
      })
      .done(data => {
        this.setState({ outputValue: data.targetRate });
      });
    }
  }

  render() {
    // reveal this with button click to view all
    // display in scrollY div
    let usethislater = <div>
      <CurrencyList
        // data={this.state.latestExchange}
      />
    </div>;

    return (
      <div>
        This is the home index page
        <div>
          This is the form div
          <form>
            From:
            <SelectFromList
              data={this.state.currencyCodes}
              handleChange={this.handleFromChange}
              fromValue={this.state.compareFrom}
            />
            To:
            <SelectToList
              data={this.state.currencyCodes}
              handleChange={this.handleToChange}
              toValue={this.state.compareTo}
            />
            <div style={{display: (this.state.compareFrom !== '' && this.state.compareTo !== '') ? 'block' : 'none' }}>
              Input:
              <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} name="inputQuantity" min="1" max="100000000" />
              Output:
              <input type="number" value={this.state.outputValue} onChange={this.handleOutputChange} name="outputQuantity" min="0" max="100000000" />
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default HomeIndex;
