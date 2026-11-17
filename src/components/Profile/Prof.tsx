import { useDispatch, useSelector } from "react-redux";
import "./prof.css";
import "../../components/Authoriz&Register/auth&register.css";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import axios from "axios";
import upTok from "../../updateTokenFunc";
import { changeToken } from "../../slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";

interface Pass {
  oldPass: string;
  newPass: string;
}
interface UserInfo {
  clientName: string;
  clientPhone: string;
}
export interface UserOne {
  id: number;
  clientName: string;
  clientPhone: string;
  password: string;
  role: string;
}

const Profile = () => {
  const navig = useNavigate();
  const [user, setUser] = useState<UserOne>({
    id: NaN,
    clientName: "",
    clientPhone: "",
    password: "",
    role: "user",
  });
  const token = useSelector((state: RootState) => state.user.accessToken);
  const [pass, setPass] = useState<Pass>({
    oldPass: "",
    newPass: "",
  });
  const [info, setInfo] = useState<UserInfo>({
    clientName: "",
    clientPhone: "",
  });
  const dispatch = useDispatch();

  function handleChange(key: string, value: string) {
    if (key.includes("Pass")) {
      console.log("я здесь");
      setPass((prev) => ({ ...prev, [key]: value }));
    } else {
      console.log("не здесь");
      setInfo((prev) => ({ ...prev, [key]: value }));
    }
  }

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
    getUser(token);
  }, [dispatch]);

  async function destroy(token: string) {
    try {
      const res = await axios.delete("http://localhost:5000/api/user/destroy", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUser({
        id: NaN,
        clientName: "",
        clientPhone: "",
        password: "",
        role: "user",
      });
      if (res.status == 200) {
        dispatch(changeToken(""));
        alert("Удаление прошло успешно");
        navig("/");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка бека:", err);
        if (err.status == 422) {
          const newtok = await upTok();
          dispatch(changeToken(newtok.token));
          destroy(newtok.token);
        }
      } else {
        console.log("Oшибка сети:", err);
      }
    }
  }

  async function UpPass(password: Pass, token: string) {
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/changePass",
        pass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (res.status == 200) {
        alert("Пароль изменён успешно ");
        console.log(res.data);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка бека:", err);
        if (err.status == 422) {
          const newtok = await upTok();
          dispatch(changeToken(newtok.token));
          UpPass(pass, newtok.token);
        }
      } else {
        console.log("Oшибка сети:", err);
      }
    }
  }
  async function UpOnfo(info: UserInfo, token: string) {
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/changeInfo",
        { info },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );
      if (res.status == 200) {
        alert("Изменения сохранены");
        console.log(res.data);
        setUser(res.data);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка бека:", err);
        if (err.status == 422) {
          const newtok = await upTok();
          dispatch(changeToken(newtok.token));
          UpOnfo(info, newtok.token);
        }
      } else {
        console.log("Oшибка сети:", err);
      }
    }
  }

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="avatar-circle">U</div>
        <h2 className="user-name">{user.clientName}</h2>
        <p className="user-phone">{user.clientPhone}</p>
        {user.role === "user" && (
          <button
            type="button"
            className="auth-button"
            onClick={() => {
              destroy(token);
            }}
          >
            Удалить аккаунт
          </button>
        )}
      </aside>

      <main className="profile-main">
        <section className="profile-section">
          <h3 className="section-title">Личные данные</h3>
          <form
            className="profile-form"
            onSubmit={(e) => {
              (e.preventDefault(), UpOnfo(info, token));
            }}
          >
            <div className="auth-field">
              <label className="auth-label">Имя</label>
              <input
                type="text"
                name="clientName"
                className="auth-input"
                defaultValue={user.clientName}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Телефон</label>
              <input
                type="text"
                name="clientPhone"
                className="auth-input"
                defaultValue={user.clientPhone}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <button type="submit" className="auth-button">
              Сохранить изменения
            </button>
          </form>
        </section>

        {/* Форма смены пароля */}
        <section className="profile-section">
          <h3 className="section-title">Смена пароля</h3>
          <form
            className="profile-form"
            onSubmit={(e) => {
              (e.preventDefault(), UpPass(pass, token));
            }}
          >
            <div className="auth-field">
              <label className="auth-label">Старый пароль</label>
              <input
                type="password"
                name="oldPass"
                className="auth-input"
                placeholder="••••••••"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Новый пароль</label>
              <input
                type="password"
                name="newPass"
                className="auth-input"
                placeholder="••••••••"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <button type="submit" className="auth-button">
              Обновить пароль
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;
