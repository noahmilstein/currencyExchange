import React from 'react';

class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        This is the home index page
      </div>
    );
  }
};

export default HomeIndex;
