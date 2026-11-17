import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../store";
import { changeToken } from "../../slices/UserSlice";
import upTok from "../../updateTokenFunc";
import { UserOne } from "../Profile/Prof";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import AdminServices from "./AdminServices";
import "../Profile/prof.css";
import "../Authoriz&Register/auth&register.css";
import "./admin.css";

const AdminPanel = () => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserOne>();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setError("");
    if (!token) return;

    async function getUser() {
      try {
        const res = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (active) setUser(res.data);
      } catch (err: any) {
        if (!active) return;
        if (err.response?.status === 422) {
          const newtok = await upTok();
          if (!active) return;
          if (newtok?.token && newtok.token !== token) {
            dispatch(changeToken(newtok.token));
            return;
          }
        }
        setUser(undefined);
        setError(err.response?.data?.message || "Не удалось проверить доступ");
      }
    }
    getUser();
    return () => { active = false; };
  }, [token, dispatch]);

  if (!token) return <Navigate to="/authorization" replace />;
  if (user && user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="profile-container admin-panel">
      <div className="profile-main">
        <h2 className="profile-title">Админ панель</h2>
        {error && <p role="alert">{error}</p>}
        {!user && !error && <p role="status">Проверка доступа...</p>}
        {error && <Link className="auth-link" to="/profile">В профиль</Link>}
        {user?.role === "admin" && (
          <>
            <AdminUsers userId={user.id} />
            <AdminProducts />
            <AdminServices />
          </>
        )}
      </div>
    </div>
  );
};
export default AdminPanel;
