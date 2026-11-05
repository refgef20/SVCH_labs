import "./masters.css";
import "../../index.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Master } from "./IMaster";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";

const Masters = () => {
  const { t, i18n } = useTranslation();
  const [selMaster, setSelmaster] = useState<Master>();
  const limit = 3;
  const [mastersGet, setMast] = useState<Master[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMasters() {
      try {
        const masters = await axios.get("http://localhost:5000/api/master", {
          params: { page, limit },
          signal: controller.signal,
        });
        const pages = Math.ceil(masters.data.count / limit) || 1;
        setTotalPages(pages);
        if (page > pages) {
          setPage(pages);
          return;
        }
        setMast(masters.data.rows);
      } catch (error) {
        if (!axios.isCancel(error)) console.error(error);
      }
    }
    fetchMasters();
    return () => controller.abort();
  }, [page]);

  return (
    <section id="master" className="container-ourMaster">
      <div className="our-master">
        <button
          type="button"
          aria-label="Назад"
          className="arrow-left"
          disabled={totalPages <= 1}
          onClick={() => setPage((prev) => (prev <= 1 ? totalPages : prev - 1))}
        >
          <img src={left} alt="" />
        </button>
        <div className="master">
          <p className="tittle-master">{t("main.masters_title")}</p>
          <div className="cards-masters" id="masters-container">
            {mastersGet.map((master) => (
              <div
                onClick={() => {
                  setSelmaster(master);
                }}
                key={master.id}
                className="card-master"
              >
                <img
                  src={master.photo || undefined}
                  alt={master.photo ? master.name : ""}
                />
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
        <button
          type="button"
          aria-label="Вперед"
          className="arrow-right"
          disabled={totalPages <= 1}
          onClick={() => setPage((prev) => (prev >= totalPages ? 1 : prev + 1))}
        >
          <img src={right} alt="" />
        </button>
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
