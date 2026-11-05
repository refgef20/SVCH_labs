import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carts } from "../components/Cart&Favourite/ICart";
import { Product } from "../components/Catalog/IProduct";

const Cart = () => {
  const userId = 1;
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getPr() {
      const res = await axios.get(
        `http://localhost:5000/api/user/${userId}/cart`,
      );
      setProducts(res.data.usersProducts);
      console.log(res.data.usersProducts);
    }
    getPr();
  }, []);
  async function deleteCart(id: number) {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    const res = await axios.get(
      `http://localhost:5000/api/user/${userId}/cart`,
    );
    setProducts(res.data.usersProducts);
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
