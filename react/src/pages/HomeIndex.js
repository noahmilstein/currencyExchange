import React from 'react';
import CurrencyList from './components/CurrencyList';
import SelectFromList from './components/SelectFromList';
import SelectToList from './components/SelectToList';
import SearchResultFromList from './components/SearchResultFromList';
import SearchResultToList from './components/SearchResultToList';

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
      searchResults: []
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOutputChange = this.handleOutputChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.focusFromHandler = this.focusFromHandler.bind(this);
    this.focusToHandler = this.focusToHandler.bind(this);
    this.displayMatches = this.displayMatches.bind(this);
    this.findMatches = this.findMatches.bind(this);
  }

  // render autocomplete results in hidden span with scrollY overflow
  // style drowndown output to hover over divs
  // add toggle to switch between autocomplete text input with select dropdown
  // add option to see compare against all currencies, render in scrollY overflow div

  // view all rates (from selected base)

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
      this.setState({ currencyCodes: data.currencyCodes });
    });
  }

  handleFromChange(event) {
    const output = {state: event.currentTarget.attributes.value.value, input: event.currentTarget.attributes.name.value }
    this.setState({
      compareFrom: output.state,
      searchResults: []
    }, () => {
      this.getLatestExchange();
      this.fromFieldInput.value = output.input
    })
  }
  handleToChange(event) {
    const output = {state: event.currentTarget.attributes.value.value, input: event.currentTarget.attributes.name.value }
    this.setState({
      compareTo: output.state,
      searchResults: []
    }, () => {
      this.getLatestExchange();
      this.toFieldInput.value = output.input
    })
  }
  handleInputChange(event) {
    this.setState({inputValue: event.target.value}, () => {
      this.getLatestExchange();
    })
  }
  handleOutputChange(event) {
    this.setState({
      inputValue: ((this.state.inputValue * event.target.value) / this.state.outputValue),
      outputValue: event.target.value
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
        this.setState({ outputValue: (data.targetRate * this.state.inputValue) });
      });
    }
  }

  findMatches(wordToMatch, currencies) {
    return currencies.filter(currency => {
      const regex = new RegExp(wordToMatch, 'gi');
      return currency.expansion.match(regex) || currency.abbreviation.match(regex);
    })
  }

  displayMatches(event) {
    let resultsArray = [];
    const matchArray = this.findMatches(event.target.value, this.state.currencyCodes);
    const html = matchArray.map(currency => {
      const regex = new RegExp(event.target.value, 'gi');
      const expandedName = currency.expansion.replace(regex, `${event.target.value}`);
      const abbreviatedName = currency.abbreviation.replace(regex, `${event.target.value}`);
      if (event.target.value === '') {
        resultsArray = [];
        return;
      } else {
        resultsArray.push({expanded: expandedName, abbreviated: abbreviatedName, id: currency.id})
      }
    })
    this.setState({searchResults: resultsArray})
  }

  focusFromHandler() {
    const target = this.fromListField.childNodes[0].children[0];
    const _this = this;
    setTimeout(function() {
      if (target.style.display === 'none') {
        target.style.display = 'block';
      } else {
        target.style.display = 'none';
        _this.setState({ searchResults: [] });
        if (_this.fromFieldInput.value === '') {
          _this.setState({ compareFrom: '' })
        }
      }
    }, 100)
  }

  focusToHandler() {
    const target = this.toListField.childNodes[0].children[0];
    const _this = this;
    setTimeout(function() {
      if (target.style.display === 'none') {
        target.style.display = 'block';
      } else {
        target.style.display = 'none';
        _this.setState({ searchResults: [] });
        if (_this.toFieldInput.value === '') {
          _this.setState({ compareTo: '' })
        }
      }
    }, 100)
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
            <input type="text" onBlur={this.focusFromHandler} onFocus={this.focusFromHandler} ref={(input) => { this.fromFieldInput = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />
            <span ref={(span) => { this.fromListField = span}} >
              <SearchResultFromList
                data={this.state.searchResults}
                fromChange={this.handleFromChange}
                fromValue={this.state.compareFrom}
              />
            </span>

              To:
              <input type="text" onBlur={this.focusToHandler} onFocus={this.focusToHandler} ref={(input) => { this.toFieldInput = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />
              <span ref={(span) => { this.toListField = span}} >
                <SearchResultToList
                  data={this.state.searchResults}
                  toChange={this.handleToChange}
                  toValue={this.state.compareTo}
                />
            </span>

            {/* <div>
              To be rendered with toggle
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
            </div> */}

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
