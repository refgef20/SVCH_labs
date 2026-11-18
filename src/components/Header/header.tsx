import { Link, useNavigate } from "react-router-dom";
import "../Header/header.css";
import "../../index.css";
import React, { Component, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { changeToken } from "../../slices/UserSlice";
import upTok from "../../updateTokenFunc";
import { UserOne } from "../Profile/Prof";

const Header = () => {
  const [user, setUser] = useState<UserOne>({
    id: NaN,
    clientName: "",
    clientPhone: "",
    password: "",
    role: "user",
  });
  const tok = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const navig = useNavigate();

  useEffect(() => {
    async function getUser(token: string) {
      try {
        const res = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.log("Ошибка бека:", err);
          if (err.status == 422) {
            const newtok = await upTok();
            dispatch(changeToken(newtok.token));
            getUser(newtok.token);
          }
        } else {
          console.log("Oшибка сети:", err);
        }
      }
    }
    getUser(tok);
  }, [dispatch]);

  async function logout(token: string) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );
      dispatch(changeToken(""));
      navig("/authorization");
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка от бэкенда:", err.response.data.message);
        if (err.status == 422) {
          const token = await axios.post(
            `http://localhost:5000/api/auth/refresh`,
            {},
            {
              withCredentials: true,
            },
          );
          dispatch(changeToken(token.data));
        }
      } else {
        console.log("Ошибка сети:", err.message);
      }
    }
  }

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
            <Link className="navigation-item" to="/" data-i18n="header.main">
              {t("header.main")}
            </Link>
          </li>
          <li>
            {tok && (
              <Link
                className="navigation-item"
                to="/cart"
                data-i18n="header.cart"
              >
                {t("header.cart")}
              </Link>
            )}
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
            {tok && (
              <Link
                className="navigation-item"
                to="/favourite"
                data-i18n="header.favorites"
              >
                {t("header.favorites")}
              </Link>
            )}
          </li>
          <li>
            {tok && (
              <Link className="navigation-item" to="/orders">
                {t("header.history")}
              </Link>
            )}
          </li>
          <li>
            {tok && (
              <Link
                className="navigation-item"
                to="/profile"
                data-i18n="header.profile"
              >
                {t("header.profile")}
              </Link>
            )}
          </li>
          <li>
            {tok && user.role === "admin" && (
              <Link className="navigation-item" to="/admin">
                Админ-панель
              </Link>
            )}
          </li>
          <li className="container-for-button">
            {tok && (
              <button
                className="btn-link"
                onClick={() => {
                  logout(tok);
                }}
              >
                {t("header.logout")}
              </button>
            )}
            {!tok && (
              <Link className="btn-link" to="/authorization">
                {t("header.login")}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
