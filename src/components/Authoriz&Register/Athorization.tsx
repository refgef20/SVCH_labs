import { useDispatch, useSelector } from "react-redux";
import "./auth&register.css";
import { RootState } from "../../store";
import { useState } from "react";
import { User } from "./IUser";
import axios from "axios";
import { changeToken } from "../../slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>({
    clientPhone: "",
    password: "",
  });
  const [error, setErrorMes] = useState("");

  function handleChange(key: string, value: string) {
    setUser((prev) => ({ ...prev, [key]: value }));
  }

  async function postUser(user: User) {
    try {
      const userTok = await axios.post(
        "http://localhost:5000/api/auth/login",
        user,
        { withCredentials: true },
      );

      dispatch(changeToken(userTok.data.token));
      navig("/");
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка от бэкенда:", err.response.data.message);
        setErrorMes(err.response.data.message);
      } else {
        console.log("Ошибка сети:", err.message);
      }
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Вход в систему</h2>
        <p className="auth-subtitle">
          Введите ваши данные для доступа к личному кабинету
        </p>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            postUser(user);
          }}
        >
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
            {error && (
              <span
                style={{
                  color: "#ff4d4d",
                  fontSize: "0.8rem",
                  marginTop: "4px",
                }}
              >
                {error}
              </span>
            )}
          </div>

          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text-gray">
            Нет аккаунта?{" "}
            <Link className="auth-link" to={"/registration"}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Auth;
