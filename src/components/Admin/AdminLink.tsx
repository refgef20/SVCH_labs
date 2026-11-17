import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../store";

const AdminLink = () => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const location = useLocation();
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    setAdmin(false);
    if (!token) return;

    async function getUser() {
      try {
        const res = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (active) setAdmin(res.data.role === "admin");
      } catch {
        if (active) setAdmin(false);
      }
    }
    getUser();
    return () => { active = false; };
  }, [token, location.key]);

  return token && isAdmin ? (
    <li>
      <Link className="navigation-item" to="/admin">Админ панель</Link>
    </li>
  ) : null;
};
export default AdminLink;
