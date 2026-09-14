import "./favor.css";
import "../../index.css";
import Menu from "./Menu";
import DescFavor from "./DescFavor";

const Favor = ({ favors }) => {
  return (
    <section className="favors-costs" id="favor">
      <div className="container-hairStyle-favors">
        <p className="item-favorsCosts" data-i18n="main.services_prices_title">
          услуги и цены
        </p>
        <div className="hair-style">
          <Menu favors={favors} />
          <hr className="line-style" />
          <DescFavor favors={favors} />
          <img className="image-wom" src="src\assets\images\work3.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Favor;
