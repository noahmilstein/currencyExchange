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
      comapreTo: '',
      inputValue: '',
      outputValue: ''
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConvertSubmit = this.handleConvertSubmit.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  componentDidMount() {
    this.getAPI()
  }

  // onchange calls getcompare() which runs the api convert path and updates the output values

  getCompare() {
    $.ajax({
      url: '/api/sources/compare',
      type: 'POST',
      data: {value: this.state.inputValue, from: this.state.compareFrom, to: this.state.compareTo },
      contentType: 'application/json'
    })
    // .done(data => {
    //   this.setState({ outputValue: data });
    // });
  }

  getAPI() {
    $.ajax({
      url: '/api/sources',
      type: 'GET',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ latestExchange: data.rates, base: data.base, timestamp: data.queryTime, currencyCodes: data.currencyCodes });
    });
  }

  handleFromChange(event) {
      this.setState({compareFrom: event.target.value});
  }
  handleToChange(event) {
      this.setState({compareTo: event.target.value});
  }
  handleInputChange(event) {
    console.log("in the method")
    this.setState({inputValue: event.target.value});
    this.getCompare()
  }
  handleOutputChange(event) {
    this.setState({outputValue: event.target.value});
    this.getCompare()
  }

  // currency convertor
  // form that takes in base country(currency) & convert_to country(currency)
  // real time on change number input/output
  // add auto complete to form

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  handleConvertSubmit(e) {
    // this should be redundant with onChange working
    console.log(e)
    debugger
  }

  // create method to handle input output changes in both directions

  render() {
    console.log(this.state.inputValue)
    return (
      <div>
        This is the home index page

        <div>
          This is the form div
          <form onSubmit={this.handleConvertSubmit}>

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

            Input:
            <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} name="inputQuantity" min="1" max="100000000" />

            Output:
            <input type="number" value={this.state.outputValue} onChange={this.handleOutputChange} name="outputQuantity" min="0" max="100000000" />

            <input type="submit" value="Submit" />
          </form>

        </div>

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
