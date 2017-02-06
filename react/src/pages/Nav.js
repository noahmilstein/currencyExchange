import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let nav = <ul className="topnav" id="myTopnav">
                <li id="logo"><Link to='/rates'>CURRENCY EXCHANGE</Link></li>
                <li><Link to='/rates'>All Rates</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to={"/"}>Convert $</Link></li>
              </ul>;

    return (
      <div>
        <div>
          {nav}
        </div>
        <div id="allPages">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Nav;
