import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import CardProductFav from "../components/Cart&Favourite/CardProductFav";
import { useState } from "react";
import axios from "axios";
import { Product } from "../components/Catalog/IProduct";
import { changeToken } from "../slices/UserSlice";
import upTok from "../updateTokenFunc";

const Favour = () => {
  const tok = useSelector((state: RootState) => state.user.accessToken);
  const [products, setProd] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getFav(token: string) {
      try {
        const pr = await axios.post(
          `http://localhost:5000/api/user/favourite`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
        setProd(pr.data.usersFavour);
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.log("Ошибка от бэкенда:", err.response.data.message);
          if (err.status == 422) {
            const newtok = await upTok();
            console.log("Токен в компоненте:", newtok);
            dispatch(changeToken(newtok.token));
            getFav(newtok.token);
          }
        } else {
          console.log("Ошибка сети:", err.message);
        }
      }
    }
    getFav(tok);
  }, []);
  async function deleteFav(id: number) {
    try {
      await axios.delete(`http://localhost:5000/api/favourite/${id}`, {
        headers: { Authorization: `Bearer ${tok}` },
        withCredentials: true,
      });
      const res = await axios.post(
        `http://localhost:5000/api/user/favourite`,
        {},
        {
          headers: { Authorization: `Bearer ${tok}` },
          withCredentials: true,
        },
      );
      setProd(res.data.usersFavour);
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка от бэкенда:", err.response.data.message);
        if (err.status == 422) {
          upTok();
        }
      } else {
        console.log("Ошибка сети:", err.message);
      }
    }
  }
  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <CardProductFav products={products} deleteFav={deleteFav} />
      </Stack>
    </Container>
  );
};
export default Favour;
