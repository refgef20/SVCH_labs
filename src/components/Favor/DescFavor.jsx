import "./favor.css";

const DescFavor = ({ favors }) => {
  return (
    <div className="description-hairstyle">
      <div className="sign-desription">
        <p className="tittle">{favors[0].favor}</p>
        <p className="description-hairCut">{favors[0].description}</p>
      </div>
      <div className="cost-with-button">
        <div className="costs-master">
          <div className="with-line">
            <div className="haircut-masterCost ">
              <p className="master-hair">Стрижка у стажёра</p>
              <div className="price-and-buttons">
                <p className="cost-hair"> 999 ₽</p>
              </div>
            </div>
            <hr className="line-haircut" />
          </div>
          <div className="with-line">
            <div className="haircut-masterCost ">
              <p className="master-hair">Стрижка у мастера</p>
              <div className="price-and-buttons">
                <p className="cost-hair"> 1899 ₽</p>
              </div>
            </div>
            <hr className="line-haircut" />
          </div>
          <div className="with-line">
            <div className="haircut-masterCost ">
              <p className="master-hair">Стрижка у профи</p>
              <div className="price-and-buttons">
                <p className="cost-hair"> 2799 ₽</p>
              </div>
            </div>
            <hr className="line-haircut" />
          </div>
        </div>
        <div className="buttons-written-master">
          <a
            className="write-button-style master-button"
            href="#master"
            data-i18n="main.masters_title"
            id="master"
          >
            Наши мастера
          </a>
        </div>
      </div>
    </div>
  );
};
export default DescFavor;
