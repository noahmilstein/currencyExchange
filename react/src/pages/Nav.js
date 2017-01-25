import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
  }

  render() {
    let nav = <ul>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
            </ul>;

    return (
      <div>
        I'm on the nav bar component
        <div>
          {nav}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Nav;
