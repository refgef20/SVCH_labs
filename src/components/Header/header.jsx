import "../Header/header.css";
import React, { Component } from "react";
const Header = () => {
  return (
    <header>
      <div className="head">
        <p className="item-icon">Annetka.Hair</p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginRight: "15px",
            marginLeft: "auto",
          }}
        >
          <div className="container-lang">
            <button
              className="lang-switch-btn"
              data-lang="ru"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              RU
            </button>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <button
              data-lang="en"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              EN
            </button>
          </div>

          <button
            id="theme-toggle-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              padding: "5px",
            }}
          >
            <span
              id="theme-icon-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></span>
          </button>
        </div>

        <div className="burger" id="burger-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="navigation" id="menu-overlay">
          <li>
            <a className="navigation-item" href="#" data-i18n="header.services">
              Услуги
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.masters">
              Мастера
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.reviews">
              Отзывы
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.main">
              Главная
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.cart">
              Корзина
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.catalog">
              Каталог
            </a>
          </li>
          <li>
            <a
              className="navigation-item"
              href="#"
              data-i18n="header.favorites"
            >
              Избранное
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.history">
              Заказы
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#" data-i18n="header.profile">
              Мой кабинет
            </a>
          </li>
          <li>
            <button
              className="navigation-item accessibility-open-btn"
              type="button"
              data-i18n="header.accessibility"
            >
              Версия для слабовидящих
            </button>
          </li>
          <li className="container-for-button">
            <button
              className="button-login"
              id="login-nav-btn"
              data-i18n="header.login"
            >
              {" "}
              Войти
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
