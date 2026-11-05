import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import "./app&ord.css";
import { UsProd } from "../Cart&Favourite/CardProduct";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState<UsProd[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const userId = 1;
  useEffect(() => {
    async function getOrd() {
      const ords = await axios.get(
        `http://localhost:5000/api/user/${userId}/order`,
      );
      const res = ords.data.userOrder;
      setOrders(res);
    }
    getOrd();
  }, []);
  async function deleteOrd(id: number) {
    const orders = await axios.delete(`http://localhost:5000/api/order/${id}`);
    const ords = await axios.get(
      `http://localhost:5000/api/user/${userId}/order`,
    );
    setOrders(ords.data.userOrder);
  }
  console.log("Один элемент заказа:", orders[0]);
  return (
    <div className="section-block">
      <h3
        style={{
          fontSize: "1.2rem",
          color: "#aaa",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "10px",
        }}
      >
        Купленные товары
      </h3>

      {orders.map((order) => (
        <div
          className="order-card"
          style={{
            backgroundColor: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#222",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={order.photo}
                alt="товар"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: "0 0 5px 0",
                }}
              >
                {order.name}
              </h4>
              <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
                Количество: {order.Order?.amount} шт.
              </p>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "5px" }}>
              Сумма
            </p>
            <p style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              {order.price * order.Order?.amount} ₽
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                const id = order.Order?.id;

                deleteOrd(id);
              }}
              className="btn-cancel"
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Orders;
