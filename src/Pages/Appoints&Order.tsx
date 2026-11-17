import Appoint from "../components/App&Orders/Apponts";
import Orders from "../components/App&Orders/Orders";
import "../components/App&Orders/app&ord.css";

const AppoinOrders = () => {
  return (
    <div
      className="orders-container"
      style={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "#fff",
      }}
    >
      <h2>Мои записи и заказы</h2>
      <Appoint />
      <Orders />
    </div>
  );
};
export default AppoinOrders;
