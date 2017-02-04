import React from 'react';
import SearchResultList from './SearchResultList';

class ConversionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      compareFrom: null,
      compareTo: null
    };
    this.findMatches = this.findMatches.bind(this);
    this.displayMatches = this.displayMatches.bind(this);
    this.setState = this.setState.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
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
    const selectedExpansion = e.currentTarget.attributes.value.value
    if (e.currentTarget.attributes.name.value === 'inputFrom') {
      this.setState({ compareFrom: selectedExpansion })
    } else if (e.currentTarget.attributes.name.value === 'inputTo') {
      this.setState({ compareTo: selectedExpansion })
    }
  }

  render() {
    return (
      <div>
        This is the form component
        <form>
          <div className="autoCompleteInput" ref={(div) => { this.autocompleteFrom = div}} style={{display:'inline-block'}}>
            From:
            <input type="text" ref={(input) => { this.fromInputField = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />
            To:
            <input type="text" ref={(input) => { this.toInputField = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />

            <span style={{display: (this.state.compareFrom === null) ? 'block' : 'none' }}>
              <h2>This is the from list</h2>
              <SearchResultList
                name='inputFrom'
                data={this.state.searchResults}
                clickHandler={this.clickHandler}
              />
            </span>
            <span style={{display: (this.state.compareFrom === null) ? 'none' : 'block' }}>
              <h2>This is the to list</h2>
              <SearchResultList
                name='inputTo'
                data={this.state.searchResults}
                clickHandler={this.clickHandler}
              />
            </span>
          </div>
        </form>
      </div>
    );
  }
};

export default ConversionForm;

{/* <div className="autoCompleteInput" ref={(div) => { this.autocompleteInput = div}} style={{display:'inline-block'}}>
  From:
  <input type="text" onBlur={this.focusFromHandler} onFocus={this.focusFromHandler} ref={(input) => { this.fromFieldInput = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />
  To:
  <input type="text" onBlur={this.focusToHandler} onFocus={this.focusToHandler} ref={(input) => { this.toFieldInput = input}} className="search" placeholder="Country or Currency" onChange={this.displayMatches} onKeyUp={this.displayMatches} />
</div>

<div className="autoCompleteDropDown">
  <div ref={(div) => { this.fromListField = div}} >
    <SearchResultFromList
      data={this.state.searchResults}
      fromChange={this.handleFromChange}
      fromValue={this.state.compareFrom}
    />
  </div>
  <div ref={(div) => { this.toListField = div}} >
    <SearchResultToList
      data={this.state.searchResults}
      toChange={this.handleToChange}
      toValue={this.state.compareTo}
    />
  </div>
</div>

<div style={{display: (this.state.compareFrom !== '' && this.state.compareTo !== '') ? 'block' : 'none' }}>
  Input:
  <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} name="inputQuantity" min="1" max="100000000" />
  Output:
  <input type="number" value={this.state.outputValue} onChange={this.handleOutputChange} name="outputQuantity" min="0" max="100000000" />
</div> */}
