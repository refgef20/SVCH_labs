import axios from "axios";
import Store from "./store";
import { changeToken } from "./slices/UserSlice";

async function refresh() {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/refresh",
      {},
      { withCredentials: true, timeout: 5000 },
    );
    return res.data as { token: string };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      Store.dispatch(changeToken(""));
    }
    return { token: "" };
  }
}

let pending: ReturnType<typeof refresh> | undefined;
function upTok() {
  if (!pending) {
    // Вкладки используют одну cookie. Обновляем её по очереди.
    const request = navigator.locks
      ? navigator.locks.request("refreshToken", refresh)
      : refresh();
    pending = request.finally(() => {
      pending = undefined;
    });
  }
  return pending;
}
export default upTok;
