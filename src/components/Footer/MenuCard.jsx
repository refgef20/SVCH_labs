import "../Footer/footer.css";
import React, { Component } from "react";

const MenuCard = () => {
  return (
    <div className="cards-allInfo">
      <div className="menu-with-bitton">
        <div className="menu">
          <div className="punkt">
            <p className="item-punkt1" data-i18n="footer.address_lbl">
              Адрес
            </p>
            <p className="item-punkt2" data-i18n="header.address">
              Москва, м. Парк Победы, Улица 1812 года, дом 1
            </p>
          </div>
          <div className="punkt">
            <p className="item-punkt1" data-i18n="footer.phone_lbl">
              Телефон
            </p>
            <p className="item-punkt2" data-i18n="header.phone">
              +7 (995) 099-27-57
            </p>
          </div>
          <div className="punkt punkt1">
            <p className="item-punkt1" data-i18n="footer.hours_lbl">
              Время работы
            </p>
            <p className="item-punkt2" data-i18n="footer.hours_workdays">
              пн-пт 7:00 - 23:00
            </p>
            <p className="item-punkt2" data-i18n="footer.hours_weekends">
              сб-вс: 11:00 - 22:00
            </p>
          </div>
          <div className="punkt">
            <p className="item-punkt1" data-i18n="footer.socials_lbl">
              соц. сети
            </p>
            <div className="social-media2">
              <p className="item-social2">in</p>
              <p className="item-social2">vk</p>
              <p className="item-social2">fc</p>
            </div>
          </div>
        </div>
        <button className="button-under-menu" data-i18n="main.write_btn">
          Наши услуги
        </button>
      </div>
      <div className="cards-navigation">
        <p className="tittle-card" data-i18n="footer.map_title">
          Карта
        </p>
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
