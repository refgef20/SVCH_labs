import { useTranslation } from "react-i18next";
import "../App.css";
import { Link } from "react-router-dom";

const Error = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="error-wrapper">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">
          {i18n.language == "ru" ? "Страница не найдена" : "Page not found"}
        </h2>
        <p className="error-description">
          {i18n.language == "ru"
            ? "Возможно, вы ввели неверный адрес, страница была удалена или перенесена. Попробуйте вернуться назад."
            : "You may have entered an incorrect address, or the page has been deleted or moved. Try going back."}
        </p>
        <div className="buttons-annet">
          <Link to={"/"} className="error-btn write-button items-button-annet">
            {i18n.language == "ru" ? "На главную" : "On the main"}
          </Link>
          <Link
            to="/catalog"
            className="error-btn favor-button items-button-annet"
          >
            {i18n.language == "ru" ? "В каталог" : "On the catalog"}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Error;
