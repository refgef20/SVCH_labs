import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store";
import { changeToken } from "../../slices/UserSlice";
import upTok from "../../updateTokenFunc";
import { Product } from "../Catalog/IProduct";

const AdminProducts = () => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    category: "",
    photo: "",
    price: 0,
    rating: 0,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoad, setLoad] = useState(false);

  function handleChange(key: string, value: string | number) {
    setProduct((prev) => ({ ...prev, [key]: value }));
  }

  async function postProduct(token: string, retry = true) {
    setLoad(true);
    setError("");
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/product", product, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setProduct({
        name: "",
        description: "",
        category: "",
        photo: "",
        price: 0,
        rating: 0,
      });
      setMessage("Товар создан");
    } catch (err: any) {
      if (err.response?.status === 422 && retry) {
        const newtok = await upTok();
        if (newtok?.token) {
          dispatch(changeToken(newtok.token));
          return postProduct(newtok.token, false);
        }
      }
      setError(err.response?.data?.message || "Не удалось создать товар");
    } finally {
      setLoad(false);
    }
  }

  return (
    <section className="profile-section">
      <h3 className="section-title">Создание товара</h3>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <form className="profile-form" onSubmit={(e) => {
        e.preventDefault();
        postProduct(token);
      }}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="product-name">Название</label>
          <input
            id="product-name"
            name="name"
            type="text"
            className="auth-input"
            value={product.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="product-description">Описание</label>
          <input
            id="product-description"
            name="description"
            type="text"
            className="auth-input"
            value={product.description}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="product-category">Категория</label>
          <input
            id="product-category"
            name="category"
            type="text"
            className="auth-input"
            value={product.category}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="product-photo">Ссылка на фото</label>
          <input
            id="product-photo"
            name="photo"
            type="url"
            className="auth-input"
            value={product.photo}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="product-price">Цена</label>
          <input
            id="product-price"
            name="price"
            type="number"
            className="auth-input"
            value={product.price}
            onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
            min="0"
            max="1000000"
            step="0.01"
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="product-rating">Рейтинг</label>
          <input
            id="product-rating"
            name="rating"
            type="number"
            className="auth-input"
            value={product.rating}
            onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>
        <button className="auth-button" type="submit" disabled={isLoad}>
          {isLoad ? "Сохранение..." : "Создать товар"}
        </button>
      </form>
    </section>
  );
};
export default AdminProducts;
