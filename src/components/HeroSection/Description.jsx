import "../HeroSection/heroSection.css";
import "../../index.css";
import { useTranslation } from "react-i18next";

const Description = ({ tittle }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="description-annet">
      <div className="social-media">
        <p className="item-social">in</p>
        <p className="item-social">vk</p>
        <p className="item-social">fc</p>
      </div>
      <div className="annetka-zapis">
        <div className="sign">
          <hr className="line-sign" />
          <p className="item-sign">{t("main.premium_salon")}</p>
        </div>
        <div className="annetka-texts-buttons">
          <p className="annet-item">{tittle}</p>
          <div className="desc-but">
            <p className="annet-inem2">{t("main.annetka_mission")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
