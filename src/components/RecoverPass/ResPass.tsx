import { useDispatch, useSelector } from "react-redux";
import "../Authoriz&Register/auth&register.css";
import { RootState } from "../../store";
import axios from "axios";
import { changeToken } from "../../slices/UserSlice";
import { useState } from "react";
import { UserInfo, UserOne } from "../Profile/Prof";
import { useNavigate } from "react-router-dom";

const RecPass = () => {
  const navig = useNavigate();
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserInfo>({
    clientName: "",
    clientPhone: "",
  });

  function handleChange(key: string, value: string) {
    setUser((prev) => ({ ...prev, [key]: value }));
  }

  async function login(user: UserInfo) {
    const res = await axios.post(
      "http://localhost:5000/api/auth/loginWithOutPass",
      user,
      {
        withCredentials: true,
      },
    );
    dispatch(changeToken(res.data.token));
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
            login(user);
            navig("/");
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
            <label className="auth-label">Ваше имя</label>
            <input
              required
              type="text"
              name="clientName"
              className="auth-input"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
          </div>

          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecPass;
