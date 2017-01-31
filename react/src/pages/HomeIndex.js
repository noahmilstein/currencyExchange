import React from 'react';
import CurrencyList from './components/CurrencyList';
import SelectFromList from './components/SelectFromList';
import SelectToList from './components/SelectToList';
// import ConversionForm from './components/ConversionForm';

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
      outputValue: ''
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleConvertSubmit = this.handleConvertSubmit.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  // set base and compare
  // display base 1 : compare ratio (as h3)
  // input text field onchange multiplies input by compare and output by base

  componentDidMount() {
    this.getAPI()
  }

  // getCompare() {
  //     let data = JSON.stringify({value: this.state.inputValue, from: this.state.compareFrom, to: this.state.compareTo })
  //     $.ajax({
  //       url: '/api/sources/compare',
  //       type: 'POST',
  //       data: data,
  //       contentType: 'application/json'
  //     })
  //   // .done(data => {
  //   //   this.setState({ outputValue: data });
  //   // });
  // }

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
      this.setState({compareFrom: event.target.value});
  }
  handleToChange(event) {
      this.setState({compareTo: event.target.value});
  }
  handleInputChange(event) {
    this.setState({inputValue: event.target.value}
    //   , () => {
    //   this.getCompare();
    // }
    )
  }
  handleOutputChange(event) {
    this.setState({outputValue: event.target.value}
    //   , () => {
    //   this.getCompare();
    // }
    )
  }

  // create method to handle input output changes in both directions

  getLatestExchange(base) {
      // AND RESUME WORK HERE
  }

  render() {
    let usethislater = <div>
      <CurrencyList
        // data={this.state.latestExchange}
      />
    </div>;
    let inputOutput;
    if (this.state.compareFrom !== '' && this.state.compareTo !== '') {
      // if user selects two currencies, make ajax post call with selected base comparitor
      // RESUME WORK HERE
      this.getLatestExchange(this.state.compareFrom)
      inputOutput = <div>
        Input:
        <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} name="inputQuantity" min="1" max="100000000" />
        Output:
        <input type="number" value={this.state.outputValue} onChange={this.handleOutputChange} name="outputQuantity" min="0" max="100000000" />
        <input type="submit" value="Submit" />
      </div>;
    }

    return (
      <div>
        This is the home index page
        <div>
          This is the form div
          {/* <form onSubmit={this.handleConvertSubmit}> */}
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
            {inputOutput}
          </form>
        </div>
      </div>
    );
  }
};

export default HomeIndex;
