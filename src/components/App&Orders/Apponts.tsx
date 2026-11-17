import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppointmentsMastFav } from "../Favor/IAppoints";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import "./app&ord.css";
import axios from "axios";
import upTok from "../../updateTokenFunc";
import { changeToken } from "../../slices/UserSlice";

const Appoint = () => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();

  const [appoints, setApps] = useState<AppointmentsMastFav[]>([]);
  useEffect(() => {
    async function fetchGet(token: string) {
      try {
        const apps = await axios.get(
          `http://localhost:5000/api/user/appointsFavMast`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
        const res = apps.data;
        setApps(res);
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.error("Ошибка бека:", err);
          if (err.status == 422) {
            const newTok = await upTok();
            dispatch(changeToken(newTok.token));
            fetchGet(newTok.token);
          }
        } else {
          console.error("Ошибка сети:", err.message);
        }
      }
    }
    fetchGet(token);
  }, []);

  async function delApp(id: number, token: string) {
    try {
      const apps = await axios.delete(
        `http://localhost:5000/api/appointment/${id}`,
      );
      const appoints = await axios.get(
        `http://localhost:5000/api/user/appointsFavMast`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      setApps(appoints.data);
    } catch (err: any) {
      if (err.response && err.response.data) {
        if (err.status == 422) {
          const newTok = await upTok();
          dispatch(changeToken(newTok.token));
        }
      }
    }
  }

  return (
    <div className="section-block" style={{ marginBottom: "40px" }}>
      <h3 className="h3-zap">Записи на услуги</h3>

      {appoints.map((appoint) => (
        <div key={appoint.id} className="order-card" style={{}}>
          <div>
            <p className="p-ied">Услуга</p>
            <h4 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
              {appoint.Favor?.title}
            </h4>
          </div>
          <div>
            <p className="p-ied">Мастер</p>
            <p className="p-ed">{appoint.Master?.name}</p>
          </div>
          <div>
            <p className="p-ied">Дата и время</p>
            <p className="p-ed">{appoint.date}</p>
          </div>
          <div>
            <button
              onClick={() => {
                const id = appoint.id;

                delApp(id, token);
              }}
              className="btn-cancel"
            >
              Отменить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Appoint;
