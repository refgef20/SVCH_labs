import "./masters.css";
import "../../index.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchMasters, fetchMastersBase } from "../../slices/MasterSlise";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Master } from "./IMaster";

const Masters = () => {
  const { t, i18n } = useTranslation();
  const [masters, setMaster] = useState([]);
  const [selMaster, setSelmaster] = useState<Master>();
  const limit = 3;
  const [mastersGet, setMast] = useState<Master[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    async function fetchMasters(page: number, limit: number) {
      const masters = await axios.get(
        `  http://localhost:5000/api/master?page=${page}&limit=${limit}`,
      );
      setMast(masters.data.rows);
    }
    fetchMasters(page, limit);
    async function MastersAll() {
      const mastersG = await axios.get(`http://localhost:5000/api/master`);
      setMaster(mastersG.data.rows);
    }
    MastersAll();
    console.log(masters[0]);
    console.log(mastersGet[0]);
  }, [page]);

  return (
    <section id="master" className="container-ourMaster">
      <div className="our-master">
        <img
          src="src/assets/images/left.svg"
          alt="Назад"
          className="arrow-left"
          style={{ cursor: "pointer" }}
          onClick={() => {
            const totalPages = Math.ceil(masters.length / limit) || 1;

            if (page <= 1) {
              setPage(totalPages);
            } else {
              setPage(page - 1);
            }
          }}
        />
        <div className="master">
          <p className="tittle-master">{t("main.masters_title")}</p>
          <div className="cards-masters" id="masters-container">
            {mastersGet.map((master) => (
              <div
                onClick={() => {
                  setSelmaster(master);
                }}
                key={master.id}
                className="card"
              >
                <img src={master.photo} alt="" />
                <div className="container-review-master">
                  <div className="review-master">
                    <div className="name-and-who">
                      <p className="name">{master.name}</p>
                      <div className="who">
                        <p className="item-who">{master.specialization}</p>
                        <p className="item-who">
                          Опыт работы: {master.experience}
                        </p>

                        <p
                          className="item-who"
                          style={{
                            marginTop: "5px",
                            color: "#930270",
                            fontWeight: "bold",
                          }}
                        >
                          {master.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-dots"></div>
        </div>
        <img
          src="src\assets\images\right.svg"
          alt="Вперед"
          className="arrow-right"
          style={{ cursor: "pointer" }}
          onClick={() => {
            const totalPages = Math.ceil(masters.length / limit) || 1;

            if (page >= totalPages) {
              setPage(1);
            } else {
              setPage(page + 1);
            }
          }}
        />
      </div>
      {selMaster && (
        <div className="modal-overlay" onClick={() => setSelmaster(undefined)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelmaster(undefined)}
            >
              ✕
            </button>

            <img
              src={selMaster.photo}
              alt={selMaster.name}
              className="modal-master-photo"
            />

            <div className="modal-master-info">
              <div className="modal-header-row">
                <h3 className="modal-name">{selMaster.name}</h3>
                <span className="modal-rating">★ {selMaster.rating}</span>
              </div>

              <p className="modal-qualification">{selMaster.qualification}</p>
              <p className="modal-category">{selMaster.specialization}</p>

              <p className="modal-description">{selMaster.description}</p>

              <div className="modal-footer">
                <span className="modal-price">
                  {i18n.language == "ru" ? "от" : "from"} {selMaster.price} ₽
                </span>
                <button className="modal-book-btn">
                  {i18n.language == "ru" ? "Записаться" : "Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Masters;
