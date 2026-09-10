import "./masters.css";

const Masters = ({ masters }) => {
  return (
    <section id="master" className="container-ourMaster">
      <div className="our-master">
        <img
          src="src\assets\images\left.svg"
          alt="Назад"
          className="arrow-left"
          style={{ cursor: "pointer" }}
        />
        <div className="master">
          <p className="tittle-master" data-i18n="main.masters_title">
            мастера
          </p>
          <div className="cards-masters" id="masters-container">
            {masters.map((master) => (
              <div key={master.name} className="card">
                <img src={master.photo} alt="" />
                <div className="container-review-master">
                  <div className="review-master">
                    <div className="name-and-who">
                      <p className="name">{master.name}</p>
                      <div className="who">
                        <p className="item-who">{master.specialty}</p>
                        <p className="item-who">{master.experience}</p>
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
                    <p className="qualification">{master.role}</p>
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
        />
      </div>
    </section>
  );
};

export default Masters;
