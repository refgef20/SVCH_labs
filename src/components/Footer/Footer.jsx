import "../Footer/footer.css";
import React, { Component } from "react";
import MenuCard from "./MenuCard";
import Navigation from "./Navigation";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container-for-footer">
          <MenuCard />
          <Navigation />
        </div>
      </footer>
    );
  }
}
export default Footer;
