import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import logo from "../logo.svg";
export default class Navbar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    return (
      <nav className="nav" id="navbar">
        <div className="nav-content">
          <img
            src={logo}
            className="nav-logo"
            alt="Logo"
            onClick={this.scrollToTop}
          />
          <h2>QServer</h2>
        </div>
      </nav>
    );
  }
}
