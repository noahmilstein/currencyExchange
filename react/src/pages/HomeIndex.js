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
      value: '',
      output: ''
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConvertSubmit = this.handleConvertSubmit.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  componentDidMount() {
    this.getAPI()
  }

  // onchange calls getcompare which runs the api convert path and updates the output values

  getCompare() {
    $.ajax({
      url: '/api/sources/compare',
      type: 'POST',
      data: {value: this.state.value, from: this.state.compareFrom, to: this.state.compareTo },
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ output: data });
    });
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
  handleChange(event) {
    this.setState({value: event.target.value});
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
              toValue={this.state.compareFrom}
            />

            Input:
            <input type="number" value={this.state.value} onChange={this.handleChange} name="quantity" min="1" max="100000000" step="10" />

            Output:
            <input type="number" name="points" min="0" max="100000000" step="10" value={this.state.output} />

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
