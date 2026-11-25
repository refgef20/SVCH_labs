import { useDispatch } from "react-redux";
import "./auth&register.css";
import axios from "axios";
import { changeToken } from "../../slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const AuthForm = z.object({
  clientPhone: z
    .string()
    .regex(/^\+7\d{10}$/, "Введите номер в формате +7XXXXXXXXXX"),
  password: z.string().optional(),
  isSmsLogin: z.boolean().optional(),
  clientName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isSmsLogin && !data.clientName?.trim()) {
    ctx.addIssue({ code: "custom", path: ["clientName"], message: "Введите имя" });
  }
  if (!data.isSmsLogin && (!data.password || data.password.length < 6)) {
    ctx.addIssue({ code: "custom", path: ["password"], message: "Введите пароль длиной от 6 символов" });
  }
});

const Auth = () => {
  type authForm = z.infer<typeof AuthForm>;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<authForm>({
    resolver: zodResolver(AuthForm),
    shouldUnregister: true,
  });
  const isSmsLogin = watch("isSmsLogin");
  const navig = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<authForm> = async (data) => {
    try {
      if (data.isSmsLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/loginWithOutPass",
          data,
          {
            withCredentials: true,
          },
        );
        dispatch(changeToken(res.data.token));
      } else {
        const userTok = await axios.post(
          "http://localhost:5000/api/auth/login",
          data,
          { withCredentials: true },
        );

        dispatch(changeToken(userTok.data.token));
      }
      navig("/");
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка от бэкенда:", err.response.data.message);
        setError("root", {
          type: "manual",
          message: err.response.data.message,
        });
      } else {
        setError("root", { message: "Не удалось связаться с сервером" });
      }
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Вход в систему</h2>
        <p className="auth-subtitle">
          Введите ваши данные для доступа к личному кабинету
        </p>
        {errors.root && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errors.root.message}
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-field">
            <label className="auth-label">Номер телефона</label>
            <input
              required
              type="text"
              placeholder="+7 (___) ___-__-__"
              className="auth-input"
              {...register("clientPhone")}
            />
            {errors.clientPhone && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.clientPhone.message}
              </span>
            )}
          </div>

          <label style={{ color: "white" }}>
            <input type="checkbox" {...register("isSmsLogin")} />
            Войти по имени
          </label>

          {isSmsLogin ? (
            <div className="auth-field">
              <label style={{ color: "white" }}>Имя</label>
              <input className="auth-input" {...register("clientName")} />
              {errors.clientName && <span>{errors.clientName.message}</span>}
            </div>
          ) : (
            <div className="auth-field">
              <label style={{ color: "white" }}>Пароль</label>
              <input
                {...register("password")}
                className="auth-input"
                type="password"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          )}

          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text-gray">
            Нет аккаунта?{" "}
            <Link className="auth-link" to={"/registration"}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="auth-text-gray">
            Забыли пароль?{" "}
            <Link className="auth-link" to={"/loginWithOutPass"}>
              Войти по имени
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Auth;
