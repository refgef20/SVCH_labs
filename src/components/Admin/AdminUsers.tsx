import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../store";
import { changeToken } from "../../slices/UserSlice";
import upTok from "../../updateTokenFunc";
import { UserOne } from "../Profile/Prof";

const AdminUsers = ({ userId }: { userId: number }) => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const navig = useNavigate();
  const [users, setUsers] = useState<Omit<UserOne, "password">[]>([]);
  const [error, setError] = useState("");
  const [isLoad, setLoad] = useState(false);

  async function getUsers(token: string, retry = true) {
    setLoad(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err: any) {
      if (err.response?.status === 422 && retry) {
        const newtok = await upTok();
        if (newtok?.token) {
          dispatch(changeToken(newtok.token));
          return getUsers(newtok.token, false);
        }
      }
      setError(err.response?.data?.message || "Не удалось загрузить пользователей");
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => { getUsers(token); }, []);

  async function changeRole(id: number, role: string, token: string, retry = true) {
    setLoad(true);
    setError("");
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true },
      );
      setUsers((prev) => prev.map((user) => user.id === id ? res.data : user));
      if (id === userId && role !== "admin") navig("/");
    } catch (err: any) {
      if (err.response?.status === 422 && retry) {
        const newtok = await upTok();
        if (newtok?.token) {
          dispatch(changeToken(newtok.token));
          return changeRole(id, role, newtok.token, false);
        }
      }
      setError(err.response?.data?.message || "Не удалось изменить роль");
    } finally {
      setLoad(false);
    }
  }

  async function deleteUser(id: number, token: string, retry = true) {
    setLoad(true);
    setError("");
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (id === userId) {
        dispatch(changeToken(""));
        navig("/authorization");
      }
    } catch (err: any) {
      if (err.response?.status === 422 && retry) {
        const newtok = await upTok();
        if (newtok?.token) {
          dispatch(changeToken(newtok.token));
          return deleteUser(id, newtok.token, false);
        }
      }
      setError(err.response?.data?.message || "Не удалось удалить аккаунт");
    } finally {
      setLoad(false);
    }
  }

  return (
    <section className="profile-section">
      <h3 className="section-title">Аккаунты пользователей</h3>
      {error && <p role="alert">{error}</p>}
      <button type="button" disabled={isLoad} onClick={() => getUsers(token)}>
        Обновить список
      </button>
      {isLoad && <p role="status">Загрузка...</p>}
      {!isLoad && !error && users.length === 0 && <p>Пользователей нет</p>}
      <div className="admin-list">
        {users.map((user) => (
          <div className="admin-row" key={user.id}>
            <div>
              <p>{user.clientName}</p>
              <p className="user-phone">{user.clientPhone}</p>
            </div>
            <div className="admin-actions">
              <label className="auth-label" htmlFor={`role-${user.id}`}>Роль</label>
              <select
                id={`role-${user.id}`}
                className="auth-input"
                value={user.role}
                disabled={isLoad}
                onChange={(e) => changeRole(user.id, e.target.value, token)}
              >
                <option value="user">Пользователь</option>
                <option value="admin">Администратор</option>
              </select>
              <button type="button" disabled={isLoad} onClick={() => {
                if (window.confirm(`Удалить аккаунт ${user.clientName}?`)) {
                  deleteUser(user.id, token);
                }
              }}>Удалить аккаунт</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default AdminUsers;
