import "../Footer/footer.css";
import "../../index.css";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="footer-with-line">
      <hr className="line-footer" />
      <div className="footer-with-nav">
        <p className="logo">annetka.hair</p>
        <ul className="navigation2">
          <li>
            <a className="navigation-item" href="!#">
              {t("header.services")}
            </a>
          </li>
          <li>
            <a className="navigation-item" href="">
              {t("header.masters")}
            </a>
          </li>
          <li>
            <a className="navigation-item" href="">
              {t("header.reviews")}
            </a>
          </li>
          <li>
            <a className="navigation-item" href="">
              {t("footer.works")}
            </a>
          </li>
        </ul>
        <div className="copyright">
          <p className="year">2014-2022</p>
          <p className="year">{t("footer.privacy")}</p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
