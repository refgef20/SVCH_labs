import "../HeroSection/heroSection.css";
import React, { Component } from "react";

const Description = ({ tittle }) => {
  return (
    <div className="description-annet">
      <div className="social-media">
        <p className="item-social">in</p>
        <p className="item-social">vk</p>
        <p className="item-social">fc</p>
      </div>
      <div className="annetka-zapis">
        <div className="sign">
          <hr className="line-sign" />
          <p className="item-sign" data-i18n="main.premium_salon">
            Салон красоты премиум класса
          </p>
        </div>
        <div className="annetka-texts-buttons">
          <p className="annet-item">{tittle}</p>
          <div className="desc-but">
            <p className="annet-inem2" data-i18n="main.annetka_mission">
              Annetka Hair - эксклюзивный салон красоты премиум класса, основная
              миссия которого - подарить Вам красивые волосы
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
