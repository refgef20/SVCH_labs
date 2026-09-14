import "../App.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-wrapper">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Страница не найдена</h2>
        <p className="error-description">
          Возможно, вы ввели неверный адрес, страница была удалена или
          перенесена. Попробуйте вернуться назад.
        </p>
        <div className="buttons-annet">
          <Link to={"/"} className="error-btn write-button items-button-annet">
            На главную
          </Link>
          <Link
            to="/catalog"
            className="error-btn favor-button items-button-annet"
          >
            В каталог
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Error;
