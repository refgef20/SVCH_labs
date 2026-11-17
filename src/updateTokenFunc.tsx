import axios from "axios";
import { useDispatch } from "react-redux";
import { changeToken } from "./slices/UserSlice";

async function upTok() {
  try {
    const token = await axios.post(
      `http://localhost:5000/api/auth/refresh`,
      {},
      { withCredentials: true },
    );

    return token.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.log("Ошибка от бэкенда:", err.response.data.message);
    } else {
      console.log("Ошибка сети:", err.message);
    }
  }
}
export default upTok;
