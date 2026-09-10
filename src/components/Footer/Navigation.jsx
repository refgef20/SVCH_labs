import "../Footer/footer.css";

const Navigation = () => {
  return (
    <div className="footer-with-line">
      <hr className="line-footer" />
      <div className="footer-with-nav">
        <p className="logo">annetka.hair</p>
        <ul className="navigation2">
          <li>
            <a
              className="navigation-item"
              href="!#"
              data-i18n="header.services"
            >
              Услуги
            </a>
          </li>
          <li>
            <a className="navigation-item" href="" data-i18n="header.masters">
              Мастера
            </a>
          </li>
          <li>
            <a className="navigation-item" href="" data-i18n="header.reviews">
              Отзывы
            </a>
          </li>
          <li>
            <a className="navigation-item" href="" data-i18n="footer.works">
              Работы
            </a>
          </li>
        </ul>
        <div className="copyright">
          <p className="year">2014-2022</p>
          <p className="year" data-i18n="footer.privacy">
            Политика конфидициальности
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
