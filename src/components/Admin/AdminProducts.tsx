import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store";
import { changeToken } from "../../slices/UserSlice";
import upTok from "../../updateTokenFunc";
import { Product } from "../Catalog/IProduct";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productAdd = z.object({
  name: z.string(),
  description: z.string().min(6),
  category: z.enum(["Styling tools", "Daily care", "Hair treatment"]),
  photo: z.string(),
  rating: z.number(),
  price: z.number(),
});

const AdminProducts = () => {
  type ProductsAdd = z.infer<typeof productAdd>;
  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductsAdd>({
    resolver: zodResolver(productAdd),
  });
  const [step, setStep] = useState(1);
  const token = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isLoad, setLoad] = useState(false);

  const priceVal = watch("price");

  const onSubmit: SubmitHandler<ProductsAdd> = async (data) => {
    const sendRequest = async (token: string) => {
      try {
        await axios.post("http://localhost:5000/api/product", data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setMessage("Товар создан");
      } catch (err: any) {
        if (err.response?.status === 422) {
          const newTok = await upTok();
          if (newTok?.token) {
            dispatch(changeToken(newTok.token));
            console.log("dmkvdnviebe");
            return sendRequest(newTok.token);
          }
        }
        setError("root", {
          message: err.response?.data?.message || "Ошибка создания",
        });
      }
    };

    await sendRequest(token);
  };

  return (
    <section className="profile-section">
      <h3 className="section-title">Создание товара</h3>
      {errors && <p role="alert">{errors.root?.message}</p>}
      {message && <p role="status">{message}</p>}
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        {/* ШАГ 1 */}
        {step === 1 && (
          <>
            <div className="auth-field">
              <label className="auth-label" htmlFor="product-name">
                Название
              </label>
              <input
                id="product-name"
                type="text"
                className="auth-input"
                {...register("name")}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="product-description">
                Описание
              </label>
              <textarea
                id="product-description"
                className="auth-input"
                {...register("description")}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Категория</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {["Styling tools", "Daily care", "Hair treatment"].map(
                      (cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ),
                    )}
                  </select>
                )}
              />
            </div>
            <button type="button" onClick={() => setStep(2)}>
              Далее
            </button>
          </>
        )}

        {/* ШАГ 2 */}
        {step === 2 && (
          <>
            <div className="auth-field">
              <label className="auth-label" htmlFor="product-photo">
                Ссылка на фото
              </label>
              <input
                id="product-photo"
                type="url"
                className="auth-input"
                {...register("photo")}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="product-price">
                Цена: {priceVal}
              </label>
              <input
                id="product-price"
                type="range"
                className="auth-input"
                min="0"
                max="1000"
                step="5"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="product-rating">
                Рейтинг
              </label>
              <input
                id="product-rating"
                type="number"
                className="auth-input"
                min="0"
                max="5"
                step="0.1"
                {...register("rating", { valueAsNumber: true })}
              />
            </div>
            <button type="button" onClick={() => setStep(1)}>
              Назад
            </button>
            <button className="auth-button" type="submit" disabled={isLoad}>
              {isLoad ? "Сохранение..." : "Создать товар"}
            </button>
          </>
        )}
      </form>
    </section>
  );
};
export default AdminProducts;
