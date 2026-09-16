import "./masters.css";
import "../../index.css";
import { useState, useEffect } from "react";

const Masters = () => {
  const [index, setIndex] = useState(0);
  const [masters, setMaster] = useState([]);
  const [selMaster, setSelmaster] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      await fetch("../src/back/db.json")
        .then((res) => res.json())
        .then((data) => setMaster(data.masters));
    }
    fetchItem();
  }, []);

  return (
    <section id="master" className="container-ourMaster">
      <div className="our-master">
        <img
          src="src\assets\images\left.svg"
          alt="Назад"
          className="arrow-left"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (index === 0) {
              setIndex(masters.length - 3);
            } else {
              setIndex(index - 1);
            }
          }}
        />
        <div className="master">
          <p className="tittle-master" data-i18n="main.masters_title">
            мастера
          </p>
          <div className="cards-masters" id="masters-container">
            {masters.slice(index, index + 3).map((master) => (
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
                      <p className="name">{master.name_ru}</p>
                      <div className="who">
                        <p className="item-who">{master.specialty_ru}</p>
                        <p className="item-who">{master.experience_ru[0]}</p>
                        <p className="item-who">{master.experience_ru[1]}</p>
                        <p
                          className="item-who"
                          style={{
                            marginTop: "5px",
                            color: "#930270",
                            fontWeight: "bold",
                          }}
                        >
                          <span data-i18n="main_js.from">от</span>
                          {master.price}
                        </p>
                      </div>
                    </div>
                    <p className="qualification">{master.qualification_ru}</p>
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
            if (index === masters.length - 3) {
              setIndex(0);
            } else {
              setIndex(index + 1);
            }
          }}
        />
      </div>
      {selMaster && (
        <div className="modal-overlay" onClick={() => setSelmaster(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelmaster(null)}
            >
              ✕
            </button>

            <img
              src={selMaster.photo}
              alt={selMaster.name_ru}
              className="modal-master-photo"
            />

            <div className="modal-master-info">
              <div className="modal-header-row">
                <h3 className="modal-name">{selMaster.name_ru}</h3>
                <span className="modal-rating">★ {selMaster.rating}</span>
              </div>

              <p className="modal-qualification">
                {selMaster.qualification_ru}
              </p>
              <p className="modal-category">
                Направление: {selMaster.category}
              </p>

              <p className="modal-description">{selMaster.description_ru}</p>

              <div className="modal-footer">
                <span className="modal-price">от {selMaster.price} ₽</span>
                <button className="modal-book-btn">Записаться</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Masters;
