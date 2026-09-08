import "./heroSection.css";
import React, { Component } from "react";
class ContInfo extends Component {
  render() {
    return (
      <div className="phone-address">
        <p className="address" data-i18n="header.address">
          Москва, м. Парк Победы, Улица 1812 года, дом 1
        </p>
        <p className="phone-number" data-i18n="header.phone">
          {this.props.phone}
        </p>
      </div>
    );
  }
}

export default ContInfo;
