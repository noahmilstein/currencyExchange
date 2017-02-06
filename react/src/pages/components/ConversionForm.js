import React from 'react';
import SearchResultList from './SearchResultList';

class ConversionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      compareFrom: null,
      compareTo: null,
      inputValue: 1,
      outputValue: ''
    };
    this.findMatches = this.findMatches.bind(this);
    this.displayMatches = this.displayMatches.bind(this);
    this.setState = this.setState.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.getLatestExchange = this.getLatestExchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  findMatches(wordToMatch, currencies) {
    return currencies.filter(currency => {
      const regex = new RegExp(wordToMatch, 'gi');
      return currency.expansion.match(regex) || currency.abbreviation.match(regex);
    })
  }

  displayMatches(event) {
    let resultsArray = [];
    const matchArray = this.findMatches(event.target.value, this.props.currencyCodes);
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

  clickHandler(e) {
    const selectedLi = e.currentTarget.attributes
    const currencyName = this.props.currencyCodes.find(currency => currency.abbreviation === selectedLi.value.value.toUpperCase())
    if (selectedLi.name.value === 'inputFrom') {
      this.setState({
        compareFrom: { abbreviated: selectedLi.value.value.toUpperCase(), expanded: currencyName.expansion },
        searchResults: []
      }, () => {
        this.resultListFrom.style.display = 'none';
        this.resultListTo.style.display = 'none';
        this.fromInputField.value = currencyName.expansion;
      })
    } else if (selectedLi.name.value === 'inputTo') {
      this.setState({
        compareTo: { abbreviated: selectedLi.value.value.toUpperCase(), expanded: currencyName.expansion },
        searchResults: []
      }, () => {
        this.resultListFrom.style.display = 'none';
        this.resultListTo.style.display = 'none';
        this.toInputField.value = currencyName.expansion;
        this.getLatestExchange()
      })
    }
  }

  focusHandler(e) {
    if (e.target.name === "compareFromInput") {
      if (this.state.compareFrom !== null) {
        e.target.value = this.state.compareFrom.expanded
      }
      this.resultListFrom.style.display = 'block'
      this.resultListTo.style.display = 'none'
    } else if (e.target.name === "compareToInput") {
      if (this.state.compareTo !== null) {
        e.target.value = this.state.compareTo.expanded
      }
      this.resultListTo.style.display = 'block'
      this.resultListFrom.style.display = 'none'
    }
  }

  getLatestExchange() {
    if (this.state.compareFrom !== '' && this.state.compareTo !== '') {
      let data = JSON.stringify({compareFrom: this.state.compareFrom.abbreviated, compareTo: this.state.compareTo.abbreviated })
      $.ajax({
        url: '/api/sources/latest_exchange',
        type: 'POST',
        data: data,
        contentType: 'application/json'
      })
      .done(data => {
        this.setState({ outputValue: (parseFloat(data.targetRate * this.state.inputValue)) });
      });
    }
  }

  handleChange(e) {
    if (e.target.name === 'outputQuantity') {
      this.setState({ outputValue: e.target.value })
    } else if (e.target.name === 'inputQuantity') {
      this.setState({ inputValue: e.target.value })
    }
    this.getLatestExchange()
  }

  render() {
    return (
      <div>
        <form id="conversionForm">
          <div className="autoCompleteInput" ref={(div) => { this.autocompleteFrom = div}} style={{display:'inline-block'}}>
            Convert From (base):
            <input type="text" name="compareFromInput" onFocus={this.focusHandler} ref={(input) => { this.fromInputField = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />
            Convert To (comparitor):
            <input type="text" name="compareToInput" onFocus={this.focusHandler} ref={(input) => { this.toInputField = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />

            <span ref={(span) => { this.resultListFrom = span }} style={{display: (this.state.compareFrom === null) ? 'block' : 'none' }}>
              <SearchResultList
                name='inputFrom'
                data={this.state.searchResults}
                clickHandler={this.clickHandler}
              />
            </span>
            <span ref={(span) => { this.resultListTo = span }} style={{display: (this.state.compareFrom === null) ? 'none' : 'block' }}>
              <SearchResultList
                name='inputTo'
                data={this.state.searchResults}
                clickHandler={this.clickHandler}
              />
            </span>

            <div style={{display: (this.state.compareTo === null) ? 'none' : 'block' }}>
              Set value of base:
              <input type="number" value={this.state.inputValue} onChange={this.handleChange} name="inputQuantity" min="1" max="100000000" />
              Set value of comparitor:
              <input type="number" value={this.state.outputValue} onChange={this.handleChange} name="outputQuantity" min="0" max="100000000" />
            </div>

          </div>
        </form>
      </div>
    );
  }
};

export default ConversionForm;
