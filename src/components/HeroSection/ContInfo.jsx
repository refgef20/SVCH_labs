import "./heroSection.css";
import React, { Component } from "react";
const ContInfo = ({ phone }) => {
  return (
    <div className="phone-address">
      <p className="address" data-i18n="header.address">
        Москва, м. Парк Победы, Улица 1812 года, дом 1
      </p>
      <p className="phone-number" data-i18n="header.phone">
        {phone}
      </p>
    </div>
  );
};

export default ContInfo;
