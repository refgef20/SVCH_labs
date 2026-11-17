import React, { useState } from "react";
import "./auth&register.css";
import { useDispatch } from "react-redux";
import { UserReg } from "./IUserReg";
import axios from "axios";
import { changeToken } from "../../slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./IUser";

const Register = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [user, setUser] = useState<UserReg>({
    clientName: "",
    clientPhone: "",
    password: "",
    role: "user",
  });
  const [error, setErrorMes] = useState<Record<string, string>>({});
  const [errorG, setGeneralError] = useState("");

  function handleChange(key: string, value: string) {
    setUser((prev) => ({ ...prev, [key]: value }));
  }

  async function regis(user: UserReg) {
    try {
      setErrorMes({});
      setGeneralError("");

      const usertok = await axios.post(
        "http://localhost:5000/api/auth/register",
        user,
        { withCredentials: true },
      );
      dispatch(changeToken(usertok.data.token));
      nav("/");
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400 && err.response.data.errors) {
          setErrorMes(err.response.data.errors);
        } else if (err.response.data.message) {
          setGeneralError(err.response.data.message);
        }
      } else {
        console.log("Ошибка сети:", err.message);
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Регистрация</h2>
        <p className="auth-subtitle">
          Создайте новый аккаунт для доступа к системе
        </p>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            regis(user);
          }}
        >
          {errorG && <p style={{ color: "red" }}>{errorG}</p>}
          <div className="auth-field">
            <label className="auth-label">Имя (Имя клиента)</label>
            <input
              required
              type="text"
              name="clientName"
              placeholder="Введите ваше имя"
              className="auth-input"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
            {error.clientName && (
              <span style={{ color: "red" }}>{error.clientName}</span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label">Номер телефона</label>
            <input
              required
              type="text"
              name="clientPhone"
              placeholder="+7 (___) ___-__-__"
              className="auth-input"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
            {error.clientPhone && (
              <span style={{ color: "red" }}>{error.clientPhone}</span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label">Пароль</label>
            <input
              required
              type="password"
              name="password"
              placeholder="••••••••"
              className="auth-input"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
            {error.password && (
              <span style={{ color: "red" }}>{error.password}</span>
            )}
          </div>

          <button type="submit" className="auth-button">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text-gray">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="auth-link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
