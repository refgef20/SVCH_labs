import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppointmentsMastFav } from "../Favor/IAppoints";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import "./app&ord.css";
import axios from "axios";

const Appoint = () => {
  const userId = 1;
  const [appoints, setApps] = useState<AppointmentsMastFav[]>([]);
  useEffect(() => {
    async function fetchGet() {
      const apps = await axios.get(
        `http://localhost:5000/api/user/${userId}/appointsFavMast`,
      );
      const res = apps.data;
      setApps(res);
    }
    fetchGet();
  }, []);

  async function delApp({ id, userId }: { id: number; userId: number }) {
    const apps = await axios.delete(
      `http://localhost:5000/api/appointment/${id}`,
    );
    const appoints = await axios.get(
      `http://localhost:5000/api/user/${userId}/appointsFavMast`,
    );
    setApps(appoints.data);
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

                delApp({ id, userId });
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
