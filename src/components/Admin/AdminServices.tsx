import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store";
import { changeToken } from "../../slices/UserSlice";
import upTok from "../../updateTokenFunc";
import { Favor } from "../Favor/IFavor";

const AdminServices = () => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const [services, setServices] = useState<Favor[]>([]);
  const [service, setService] = useState<Omit<Favor, "id">>({
    title: "", category: "", price: 0, duration: 15, photo: "",
  });
  const [idSel, setId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;
  const [reload, setReload] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [isListLoad, setListLoad] = useState(false);

  useEffect(() => {
    let active = true;
    setListLoad(true);
    async function getServices() {
      try {
        const res = await axios.get("http://localhost:5000/api/services", {
          params: { page, limit },
        });
        if (!active) return;
        const totalPages = Math.ceil(res.data.count / limit) || 1;
        if (page > totalPages) {
          setPage(totalPages);
          return;
        }
        setServices(res.data.rows);
        setCount(res.data.count);
      } catch (err: any) {
        if (active) setError(err.response?.data?.message || "Не удалось загрузить услуги");
      } finally {
        if (active) setListLoad(false);
      }
    }
    getServices();
    return () => { active = false; };
  }, [page, reload]);

  function handleChange(key: string, value: string | number) {
    setService((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setId(null);
    setService({ title: "", category: "", price: 0, duration: 15, photo: "" });
  }

  async function saveService(token: string, retry = true) {
    setLoad(true);
    setError("");
    setMessage("");
    try {
      if (idSel === null) {
        await axios.post("http://localhost:5000/api/services", service, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        await axios.patch(`http://localhost:5000/api/services/${idSel}`, service, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
      setMessage(idSel === null ? "Услуга создана" : "Услуга изменена");
      resetForm();
      setReload((prev) => prev + 1);
    } catch (err: any) {
      if (err.response?.status === 422 && retry) {
        const newtok = await upTok();
        if (newtok?.token) {
          dispatch(changeToken(newtok.token));
          return saveService(newtok.token, false);
        }
      }
      setError(err.response?.data?.message || "Не удалось сохранить услугу");
    } finally {
      setLoad(false);
    }
  }

  async function deleteService(id: number, token: string, retry = true) {
    setLoad(true);
    setError("");
    setMessage("");
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (id === idSel) resetForm();
      setMessage("Услуга удалена");
      setReload((prev) => prev + 1);
    } catch (err: any) {
      if (err.response?.status === 422 && retry) {
        const newtok = await upTok();
        if (newtok?.token) {
          dispatch(changeToken(newtok.token));
          return deleteService(id, newtok.token, false);
        }
      }
      setError(err.response?.data?.message || "Не удалось удалить услугу");
    } finally {
      setLoad(false);
    }
  }

  return (
    <section className="profile-section">
      <h3 className="section-title">Управление услугами</h3>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <h4>{idSel === null ? "Создание услуги" : "Редактирование услуги"}</h4>
      <form className="profile-form" onSubmit={(e) => {
        e.preventDefault();
        saveService(token);
      }}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="service-title">Название</label>
          <input
            id="service-title"
            name="title"
            type="text"
            className="auth-input"
            value={service.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="service-category">Категория</label>
          <input
            id="service-category"
            name="category"
            type="text"
            className="auth-input"
            value={service.category}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="service-price">Цена</label>
          <input
            id="service-price"
            name="price"
            type="number"
            className="auth-input"
            value={service.price}
            onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="service-duration">Длительность в минутах</label>
          <input
            id="service-duration"
            name="duration"
            type="number"
            className="auth-input"
            value={service.duration}
            onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
            min="15"
            step="1"
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="service-photo">Ссылка на фото</label>
          <input
            id="service-photo"
            name="photo"
            type="url"
            className="auth-input"
            value={service.photo}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="admin-actions">
          <button className="auth-button" type="submit" disabled={isLoad}>
            {isLoad ? "Сохранение..." : idSel === null ? "Создать услугу" : "Сохранить услугу"}
          </button>
          {idSel !== null && (
            <button type="button" disabled={isLoad} onClick={resetForm}>Отменить</button>
          )}
        </div>
      </form>
      <div className="admin-list" aria-busy={isListLoad}>
        {isListLoad && <p role="status">Загрузка услуг...</p>}
        {!isListLoad && services.length === 0 && <p>Услуг нет</p>}
        {services.map((favor) => (
          <div className="admin-row" key={favor.id}>
            <div>
              <p>{favor.title}</p>
              <p className="user-phone">{favor.category} · {favor.price} ₽ · {favor.duration} мин.</p>
            </div>
            <div className="admin-actions">
              <button type="button" disabled={isLoad || isListLoad} onClick={() => {
                setId(favor.id);
                setService({
                  title: favor.title,
                  category: favor.category || "",
                  price: favor.price,
                  duration: favor.duration,
                  photo: favor.photo,
                });
                setError("");
                setMessage("");
                document.getElementById("service-title")?.focus();
              }}>Редактировать</button>
              <button type="button" disabled={isLoad || isListLoad} onClick={() => {
                if (window.confirm("Удалить услугу «" + favor.title + "»?")) {
                  deleteService(favor.id, token);
                }
              }}>Удалить услугу</button>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-actions">
        <button type="button" disabled={page <= 1 || isLoad || isListLoad} onClick={() => setPage(page - 1)}>
          Назад
        </button>
        <span>Страница {page} из {Math.ceil(count / limit) || 1}</span>
        <button type="button" disabled={page * limit >= count || isLoad || isListLoad} onClick={() => setPage(page + 1)}>
          Далее
        </button>
        <button type="button" disabled={isLoad || isListLoad} onClick={() => {
          setError("");
          setReload((prev) => prev + 1);
        }}>Обновить услуги</button>
      </div>
    </section>
  );
};
export default AdminServices;
