import "../Footer/footer.css";
import "../../index.css";
import React, { Component } from "react";
import { useTranslation } from "react-i18next";

const MenuCard = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="cards-allInfo">
      <div className="menu-with-bitton">
        <div className="menu">
          <div className="punkt">
            <p className="item-punkt1">{t("footer.address_lbl")}</p>
            <p className="item-punkt2">{t("header.address")}</p>
          </div>
          <div className="punkt">
            <p className="item-punkt1">{t("footer.phone_lbl")}</p>
            <p className="item-punkt2">{t("header.phone")}</p>
          </div>
          <div className="punkt punkt1">
            <p className="item-punkt1">{t("footer.hours_lb")}</p>
            <p className="item-punkt2">{t("footer.hours_workdays")}</p>
            <p className="item-punkt2">{t("footer.hours_weekends")}</p>
          </div>
          <div className="punkt">
            <p className="item-punkt1">{t("footer.socials_lbl")}</p>
            <div className="social-media2">
              <p className="item-social2">in</p>
              <p className="item-social2">vk</p>
              <p className="item-social2">fc</p>
            </div>
          </div>
        </div>
        <button className="button-under-menu">{t("main.write_btn")}</button>
      </div>
      <div className="cards-navigation">
        <p className="tittle-card">{t("footer.map_title")}</p>
        <iframe
          src="https://yandex.ru/map-widget/v1/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%201812%20%D0%B3%D0%BE%D0%B4%D0%B0%2C%20%D0%B4%D0%BE%D0%BC%201&z=16"
          width="100%"
          height="250"
          style={{ border: "0", borderRadius: "8px" }}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default MenuCard;
