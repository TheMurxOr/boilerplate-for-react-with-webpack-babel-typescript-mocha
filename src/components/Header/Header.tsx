import * as $ from "jquery"
import { Component } from "react"
import * as React from "react"
import "./Header.scss"


// const logo = require("../../../public/logo.png");
interface IHeaderProps {
  firstname: string;
  profileImage: any;
}
export default class Header extends Component<IHeaderProps, any> {
  public render() {
    return (
      <header id="top-header" className="fixed-top">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            {/* <img src={logo} /> */}
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto my-1 my-lg-0">
              <li className="nav-item active">
                <span id="firstNameSpan" className="nav-link">Moin {this.props.firstname}!</span>
              </li>
              <li className="nav-item">
                <img id="profileImage" className="profile-picture" src={this.props.profileImage} />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
  public componentDidMount() {
    // todo: refactor this to native react code!!!

    const defaultOpacity = 0.96;
    let oldScrollOffset = $(document).scrollTop() || 0;
    const header = $("#top-header");
    const navbar = $(".navbar", header);
    let isHeaderVisible = true;

    $(window).on("scroll load", () => {
      const scrollPosition = $(document).scrollTop() || 0;

      if (scrollPosition > oldScrollOffset) {
        if (isHeaderVisible) {
          const topHeaderHeight = header.height() || 0;
          header.animate({ top: -topHeaderHeight }, 500);
          isHeaderVisible = false;
        }
      } else {
        if (!isHeaderVisible) {
          header.animate({ top: 0 }, 500);
          isHeaderVisible = true;
        }
      }

      oldScrollOffset = scrollPosition;
      let opacity;

      if (scrollPosition > 300) {
        opacity = defaultOpacity;
      } else {
        opacity = (scrollPosition / 200);
      }
      navbar.css("background-color", "rgba(255, 255, 255, " + opacity.toFixed(2) + ")");
    });

  }
}

