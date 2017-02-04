import React from 'react';
import ConversionForm from './components/ConversionForm';

class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyCodes: [],
    };
    this.setState = this.setState.bind(this);
    this.getAPI = this.getAPI.bind(this);
  }

  componentWillMount() {
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

  render() {
    return (
      <div>
        This is the home index page
        <div>
          This is the form component div
          <ConversionForm
            currencyCodes={this.state.currencyCodes}
          />
        </div>
      </div>
    );
  }
};

export default HomeIndex;
