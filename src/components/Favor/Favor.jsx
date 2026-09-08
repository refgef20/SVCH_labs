import "./favor.css";
import React, { Component } from "react";
import Menu from "./Menu";
import DescFavor from "./DescFavor";

class Favor extends Component {
  render() {
    return (
      <section className="favors-costs" id="favor">
        <div className="container-hairStyle-favors">
          <p
            className="item-favorsCosts"
            data-i18n="main.services_prices_title"
          >
            услуги и цены
          </p>
          <div className="hair-style">
            <Menu favors={this.props.favors} />
            <hr className="line-style" />
            <DescFavor favors={this.props.favors} />
            <img
              className="image-wom"
              src="src\assets\images\work3.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    );
  }
}
export default Favor;
