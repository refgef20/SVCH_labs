import "./heroSection.css";
import "../../index.css";
import React, { Component } from "react";
import { useTranslation } from "react-i18next";

const ContInfo = ({ phone }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="phone-address">
      <p className="address">{t("header.address")}</p>
      <p className="phone-number" data-i18n="header.phone">
        {phone}
      </p>
    </div>
  );
};

export default ContInfo;
