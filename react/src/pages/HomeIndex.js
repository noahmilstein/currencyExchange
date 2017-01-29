import React from 'react';
import CurrencyList from './components/CurrencyList';
import SelectList from './components/SelectList';
// import ConversionForm from './components/ConversionForm';

class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestExchange: [],
      base: '',
      timestamp: '',
      currencyCodes: [],
      compareFrom: ''
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConvertSubmit = this.handleConvertSubmit.bind(this);
    this.handleBaseChange = this.handleBaseChange.bind(this);
  }

  componentDidMount() {
    this.getAPI()
  }

  // currency convertor
  // form that takes in base country(currency) & convert_to country(currency)
  // real time on change number input/output
  // add auto complete to form


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

  handleBaseChange(event) {
    this.setState({compareFrom: event.target.value});
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  handleConvertSubmit(e) {
    console.log(e)
    debugger
  }

  render() {
    return (
      <div>
        This is the home index page

        <div>
          This is the form div
          <form onSubmit={this.handleConvertSubmit}>

            From:
            <SelectList
              data={this.state.currencyCodes}
              handleChange={this.handleBaseChange}
              fromValue={this.state.compareFrom}
            />
            To:
            <SelectList
              data={this.state.currencyCodes}
            />

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
