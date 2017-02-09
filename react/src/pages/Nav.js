import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentDidMount() {
    // let allRoutes = [];
    // this.props.route.childRoutes.forEach(route => {
    //   allRoutes.push(route.path)
    // })
    // const url = window.location.href;
    // allRoutes.forEach(route => {
    //   if (url.includes(route)) {
    //     this.refs[route].classList.add('active')
    //   } else {
    //     this.refs.root.classList.add('active')
    //   }
    // })
  // }

  render() {

    let nav = <ul className="topnav" id="myTopnav">
                <li id="logo" ref='logo'><Link to='/'>CURRENCY EXCHANGE</Link></li>
                <li ref='rates'><Link to='/rates' activeClassName='active'>All Rates</Link></li>
                <li ref='about'><Link to='/about' activeClassName='active'>About</Link></li>
                <li ref='convert'><Link to='/convert' activeClassName='active'>Convert $</Link></li>
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
