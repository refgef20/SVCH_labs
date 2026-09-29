import { Link } from "react-router-dom";
import "../Header/header.css";
import "../../index.css";
import React, { Component } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
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
              onClick={(e) => i18n.changeLanguage("ru")}
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
              onClick={(e) => i18n.changeLanguage("en")}
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
            <a className="navigation-item" href="#favor">
              {t("header.services")}
            </a>
          </li>
          <li>
            <a className="navigation-item" href="#master">
              {t("header.masters")}
            </a>
          </li>
          <li>
            <Link className="navigation-item" to="/">
              {t("header.reviews")}
            </Link>
          </li>
          <li>
            <Link className="navigation-item" to="/" data-i18n="header.main">
              {t("header.main")}
            </Link>
          </li>
          <li>
            <Link
              className="navigation-item"
              to="/cart"
              data-i18n="header.cart"
            >
              {t("header.cart")}
            </Link>
          </li>
          <li>
            <Link
              className="navigation-item"
              to="/catalog"
              data-i18n="header.catalog"
            >
              {t("header.catalog")}
            </Link>
          </li>
          <li>
            <Link
              className="navigation-item"
              to="/favourite"
              data-i18n="header.favorites"
            >
              {t("header.favorites")}
            </Link>
          </li>
          <li>
            <Link className="navigation-item" to="/">
              {t("header.history")}
            </Link>
          </li>
          <li>
            <Link className="navigation-item" to="/" data-i18n="header.profile">
              {t("header.profile")}
            </Link>
          </li>
          <li>
            <button
              className="navigation-item accessibility-open-btn"
              type="button"
            >
              {t("header.accessibility")}
            </button>
          </li>
          <li className="container-for-button">
            <button
              className="button-login"
              id="login-nav-btn"
              data-i18n="header.login"
            >
              {" "}
              {t("header.login")}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
