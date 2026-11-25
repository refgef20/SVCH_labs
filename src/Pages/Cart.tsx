import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carts } from "../components/Cart&Favourite/ICart";
import { Product } from "../components/Catalog/IProduct";
import upTok from "../updateTokenFunc";
import { changeToken } from "../slices/UserSlice";

const Cart = () => {
  const tok = useSelector((state: RootState) => state.user.accessToken);
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getPr(token: string) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/cart",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
        setProducts(res.data.usersProducts);
        console.log(res.data.usersProducts);
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.log("Ошибка от бэкенда:", err.response.data.message);
          if (err.status == 422) {
            const newtok = await upTok();
            console.log("Токен в компоненте:", newtok.token);

            dispatch(changeToken(newtok.token));
          }
        } else {
          console.log("Ошибка сети:", err.message);
        }
      }
    }
    getPr(tok);
  }, []);
  async function deleteCart(id: number, token: string) {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const res = await axios.post(
        "http://localhost:5000/api/user/cart",
        {},
        {
          headers: { Authorization: `Bearer ${tok}` },
          withCredentials: true,
        },
      );
      setProducts(res.data.usersProducts);
      console.log(res.data.usersProducts);
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка от бэкенда:", err.response.data.message);
        if (err.status == 422) {
          const newtok = await upTok();

          dispatch(changeToken(newtok.token));
        }
      } else {
        console.log("Ошибка сети:", err.message);
      }
    }
  }
  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <CardProduct products={products} deleteCart={deleteCart} />
      </Stack>
    </Container>
  );
};
export default Cart;
